import { useState, useEffect } from 'react';

/**
 * Retorna um valor "debounced" — atualizado somente após o delay passar
 * sem novas mudanças. Ideal para campos de busca.
 *
 * @example
 * const debouncedQuery = useDebouncedValue(query, 400);
 */
export function useDebouncedValue<T>(value: T, delayMs: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
