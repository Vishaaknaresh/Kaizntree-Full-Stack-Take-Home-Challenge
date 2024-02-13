import { useCallback, useState } from "react";

import {
  PaginatedRequestParams,
  PaginatedResponse,
  Transaction,
} from "../utils/types";
import { PaginatedTransactionsResult } from "./types";
import { useCustomFetch } from "./useCustomFetch";

export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithCache, loading } = useCustomFetch();
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<Transaction[]> | null>(null);
  const [hasMoreTransactions, setHasMoreTransactions] = useState(true);

  const fetchAll = useCallback(async () => {
    const nextPage = paginatedTransactions?.nextPage ?? 0;
    const response = await fetchWithCache<PaginatedResponse<Transaction[]>, PaginatedRequestParams>(
      "paginatedTransactions", { page: nextPage });

    if (response) {
      // Simplify the merging of new data with existing data
      setPaginatedTransactions(prev => ({
        data: [...(prev?.data ?? []), ...response.data],
        nextPage: response.nextPage,
      }));
      
      // Use Boolean operator to determine if more transactions exist
      setHasMoreTransactions(Boolean(response.nextPage));
    }
  }, [fetchWithCache, paginatedTransactions?.nextPage]); // To reduce unnecessary re-renders

  const invalidateData = useCallback(() => {
    setPaginatedTransactions(null);
    setHasMoreTransactions(true);
  }, []);

  return {
    data: paginatedTransactions,
    loading,
    fetchAll,
    invalidateData,
    hasMoreTransactions,
  };
}
