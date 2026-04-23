/**
 * rateLimiter.ts
 * Rate limiters client-side para prevenir spam e ações destrutivas.
 * Usa um mapa de timestamps para rastrear chamadas recentes por chave.
 */

interface RateLimiterConfig {
  /** Número máximo de chamadas permitidas no intervalo */
  maxRequests: number;
  /** Janela de tempo em milissegundos */
  windowMs: number;
  /** Mensagem de erro amigável */
  message?: string;
}

class RateLimiter {
  private config: Required<RateLimiterConfig>;
  /** Map de key → timestamps das chamadas recentes */
  private store = new Map<string, number[]>();

  constructor(config: RateLimiterConfig) {
    this.config = {
      message: 'Muitas ações em pouco tempo. Aguarde um momento.',
      ...config,
    };
  }

  /**
   * Verifica se a chave está dentro do limite.
   * @returns `true` se a ação é permitida, `false` se bloqueada.
   */
  check(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    const timestamps = (this.store.get(key) ?? []).filter((t) => t > windowStart);

    if (timestamps.length >= this.config.maxRequests) {
      return false;
    }

    timestamps.push(now);
    this.store.set(key, timestamps);
    return true;
  }

  /**
   * Verifica e lança erro se o limite foi excedido.
   * @throws Error com mensagem amigável
   */
  checkOrThrow(key: string): void {
    if (!this.check(key)) {
      throw new Error(this.config.message);
    }
  }

  /**
   * Retorna quantos segundos até a próxima ação permitida.
   */
  getRetryAfterMs(key: string): number {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    const timestamps = (this.store.get(key) ?? []).filter((t) => t > windowStart);

    if (timestamps.length < this.config.maxRequests) return 0;

    const oldest = Math.min(...timestamps);
    return oldest + this.config.windowMs - now;
  }

  /** Limpa o histórico de uma chave (ex: após logout) */
  reset(key: string): void {
    this.store.delete(key);
  }

  /** Limpa todo o store (ex: após logout global) */
  resetAll(): void {
    this.store.clear();
  }
}

// ── Instâncias pré-configuradas ───────────────────────────────────────────────

/** Para ações sociais: follow, like, comentar — 5 req / 60s */
export const socialLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 60_000,
  message: 'Você está agindo rápido demais. Aguarde 1 minuto.',
});

/** Para ações destrutivas: delete, ban, report — 5 req / 60s */
export const destructiveLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 60_000,
  message: 'Limite de exclusões atingido. Aguarde 1 minuto.',
});

/** Para buscas e consultas pesadas — 10 req / 30s */
export const searchLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 30_000,
  message: 'Muitas buscas. Aguarde alguns segundos.',
});

/** Para tentativas de autenticação — 5 req / 5min */
export const authLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 5 * 60_000,
  message: 'Muitas tentativas de login. Aguarde 5 minutos.',
});

export { RateLimiter };
