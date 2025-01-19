import { useCallback, useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { getInfiniteServicesQueryOptions } from "@/features/service/api/get-services";
import { getMonthlyTransactionsQueryOptions } from "@/features/statistic/api/get-monthly-transactions";
import { getTrendingServicesQueryOptions } from "@/features/statistic/api/get-trending-services";
import { getInfiniteTransactionsQueryOptions } from "@/features/transaction/api/get-transactions";

export const useInitialPrefetch = () => {
  /* ======================================== STATES */
  const [isLoading, setIsLoading] = useState(true);

  /* ======================================== HOOKS */
  const queryClient = useQueryClient();

  /* ======================================== FUNCTIONS */
  const prefetch = useCallback(async () => {
    try {
      await Promise.all([
        queryClient.prefetchInfiniteQuery(getInfiniteServicesQueryOptions({ mode: "acquire" })),
        queryClient.prefetchInfiniteQuery(getInfiniteServicesQueryOptions({ mode: "provide" })),
        queryClient.prefetchInfiniteQuery(getInfiniteTransactionsQueryOptions({ mode: "incoming" })),
        queryClient.prefetchInfiniteQuery(getInfiniteTransactionsQueryOptions({ mode: "outgoing" })),
        queryClient.prefetchInfiniteQuery(getInfiniteTransactionsQueryOptions({ mode: "ongoing" })),
        queryClient.prefetchInfiniteQuery(getInfiniteTransactionsQueryOptions({ mode: "history" })),
        queryClient.prefetchQuery(getMonthlyTransactionsQueryOptions()),
        queryClient.prefetchQuery(getTrendingServicesQueryOptions()),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [queryClient]);

  /* ======================================== RETURNS */
  useEffect(() => {
    prefetch();
  }, [prefetch]);
  return { isLoading };
};
