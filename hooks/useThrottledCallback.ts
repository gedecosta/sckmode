import { useRef, useCallback } from 'react';

/**
 * Retorna uma versão throttled do callback — garante que a função seja chamada
 * no máximo uma vez por intervalo, ignorando chamadas intermediárias.
 *
 * @example
 * const throttledSave = useThrottledCallback(() => save(), 1000);
 */
export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  intervalMs: number = 500
): T {
  const lastCallRef = useRef<number>(0);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    (...args: unknown[]) => {
      const now = Date.now();
      if (now - lastCallRef.current >= intervalMs) {
        lastCallRef.current = now;
        return callbackRef.current(...args);
      }
    },
    [intervalMs]
  ) as T;
}
