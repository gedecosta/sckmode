import { useState, useCallback } from 'react';

/**
 * Gerencia o estado de pull-to-refresh de uma lista.
 * Retorna `refreshing` e `onRefresh` prontos para usar em ScrollView/FlatList.
 *
 * @example
 * const { refreshing, onRefresh } = useRefreshControl(refetch);
 */
export function useRefreshControl(refetch: () => Promise<unknown> | unknown) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return { refreshing, onRefresh };
}
