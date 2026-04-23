/**
 * logger.ts
 * Logger centralizado e production-safe.
 * Em produção, sanitiza automaticamente dados sensíveis antes de logar.
 * Em desenvolvimento, exibe tudo normalmente para facilitar debug.
 */

import { sanitizeMessage } from './errorSanitizer';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const IS_PROD = process.env.NODE_ENV === 'production';

function formatMessage(level: LogLevel, message: string, context?: string): string {
  const prefix = context ? `[${context}]` : '';
  return `[Athledia/${level.toUpperCase()}] ${prefix} ${message}`.trim();
}

function sanitize(value: unknown): unknown {
  if (typeof value === 'string') return sanitizeMessage(value);
  if (value instanceof Error) return sanitizeMessage(value.message);
  if (typeof value === 'object' && value !== null) {
    try {
      return JSON.parse(sanitizeMessage(JSON.stringify(value)));
    } catch {
      return '[OBJECT_REDACTED]';
    }
  }
  return value;
}

export const logger = {
  debug(message: string, data?: unknown, context?: string) {
    if (IS_PROD) return; // Debug logs suppressed in production
    console.log(formatMessage('debug', message, context), data ?? '');
  },

  info(message: string, data?: unknown, context?: string) {
    const msg = IS_PROD ? sanitizeMessage(message) : message;
    const safeData = IS_PROD ? sanitize(data) : data;
    console.info(formatMessage('info', msg, context), safeData ?? '');
  },

  warn(message: string, data?: unknown, context?: string) {
    const msg = IS_PROD ? sanitizeMessage(message) : message;
    const safeData = IS_PROD ? sanitize(data) : data;
    console.warn(formatMessage('warn', msg, context), safeData ?? '');
  },

  error(message: string, error?: unknown, context?: string) {
    const msg = IS_PROD ? sanitizeMessage(message) : message;
    const safeError = IS_PROD ? sanitize(error) : error;
    console.error(formatMessage('error', msg, context), safeError ?? '');
  },
};

export default logger;
