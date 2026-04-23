/**
 * errorSanitizer.ts
 * Centraliza a sanitização de dados sensíveis antes de logar ou exibir erros.
 * Em produção, remove JWT, Bearer tokens, API keys, hashes, senhas.
 */

const SENSITIVE_PATTERNS: Array<[RegExp, string]> = [
  // JWT tokens  (header.payload.signature)
  [/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*/g, '[JWT_REDACTED]'],
  // Bearer tokens
  [/Bearer\s+[A-Za-z0-9\-._~+/]+=*/gi, 'Bearer [TOKEN_REDACTED]'],
  // API keys / secrets (key=..., apiKey=..., secret=...)
  [/(api[_-]?key|apikey|secret|token|access_token|refresh_token)\s*[:=]\s*["']?[A-Za-z0-9_\-./]{8,}/gi, '$1=[REDACTED]'],
  // Supabase anon keys (long base64-like strings)
  [/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*/g, '[SUPABASE_KEY_REDACTED]'],
  // Hex hashes (SHA256, MD5, etc.)
  [/\b[0-9a-f]{32,64}\b/gi, '[HASH_REDACTED]'],
  // Passwords in messages
  [/(password|senha|pwd)\s*[:=]\s*\S+/gi, '$1=[REDACTED]'],
  // Email addresses (optional — remove if you want emails in logs)
  // [/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_REDACTED]'],
];

/**
 * Sanitizes a string, removing sensitive data patterns.
 */
export function sanitizeMessage(message: string): string {
  let sanitized = message;
  for (const [pattern, replacement] of SENSITIVE_PATTERNS) {
    sanitized = sanitized.replace(pattern, replacement);
  }
  return sanitized;
}

/**
 * Sanitizes an Error object and returns a clean version.
 */
export function sanitizeError(error: unknown): Error {
  if (error instanceof Error) {
    const sanitized = new Error(sanitizeMessage(error.message));
    sanitized.name = error.name;
    // Do NOT copy .stack in production — it may contain file paths
    return sanitized;
  }
  if (typeof error === 'string') {
    return new Error(sanitizeMessage(error));
  }
  return new Error('Erro desconhecido.');
}

/**
 * Maps Supabase/server errors to user-friendly Portuguese messages.
 * Keeps technical details out of the UI.
 */
export function getUserFriendlyMessage(error: unknown): string {
  const message =
    error instanceof Error
      ? error.message.toLowerCase()
      : String(error).toLowerCase();

  // Auth errors
  if (message.includes('invalid login credentials') || message.includes('invalid_credentials')) {
    return 'E-mail ou senha incorretos. Tente novamente.';
  }
  if (message.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de entrar.';
  }
  if (message.includes('user already registered') || message.includes('already been registered')) {
    return 'Este e-mail já está cadastrado. Tente fazer login.';
  }
  if (message.includes('password') && message.includes('short')) {
    return 'Senha muito curta. Use pelo menos 8 caracteres.';
  }
  if (message.includes('email') && (message.includes('invalid') || message.includes('format'))) {
    return 'Endereço de e-mail inválido.';
  }
  if (message.includes('rate limit') || message.includes('too many requests')) {
    return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
  }

  // Storage/upload errors
  if (message.includes('file size') || message.includes('payload too large')) {
    return 'Arquivo muito grande. Use um arquivo menor que 10MB.';
  }
  if (message.includes('mime type') || message.includes('invalid file')) {
    return 'Tipo de arquivo não suportado.';
  }

  // Duplicate / unique constraint
  if (message.includes('duplicate') || message.includes('unique constraint')) {
    return 'Este registro já existe.';
  }

  // Network / server
  if (message.includes('network') || message.includes('fetch') || message.includes('timeout')) {
    return 'Sem conexão. Verifique sua internet e tente novamente.';
  }
  if (message.includes('500') || message.includes('internal server')) {
    return 'Erro no servidor. Tente novamente em instantes.';
  }
  if (message.includes('not found') || message.includes('404')) {
    return 'Recurso não encontrado.';
  }
  if (message.includes('permission') || message.includes('unauthorized') || message.includes('403')) {
    return 'Você não tem permissão para realizar esta ação.';
  }

  // Fallback
  return 'Algo deu errado. Tente novamente.';
}
