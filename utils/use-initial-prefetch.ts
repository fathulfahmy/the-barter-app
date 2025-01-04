import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { getInfiniteServicesQueryOptions } from "@/features/service/api/get-services";
import { getInfiniteTransactionsQueryOptions } from "@/features/transaction/api/get-transactions";

export const useInitialPrefetch = () => {
  /* ======================================== STATES */
  const [isLoading, setIsLoading] = useState(true);

  /* ======================================== HOOKS */
  const queryClient = useQueryClient();

  /* ======================================== FUNCTIONS */
  const fetch = async () => {
    try {
      await Promise.all([
        queryClient.prefetchInfiniteQuery(getInfiniteServicesQueryOptions({ mode: "acquire" })),
        queryClient.prefetchInfiniteQuery(getInfiniteServicesQueryOptions({ mode: "provide" })),
        queryClient.prefetchInfiniteQuery(getInfiniteTransactionsQueryOptions({ mode: "incoming" })),
        queryClient.prefetchInfiniteQuery(getInfiniteTransactionsQueryOptions({ mode: "outgoing" })),
        queryClient.prefetchInfiniteQuery(getInfiniteTransactionsQueryOptions({ mode: "ongoing" })),
        queryClient.prefetchInfiniteQuery(getInfiniteTransactionsQueryOptions({ mode: "history" })),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ======================================== RETURNS */
  useEffect(() => {
    fetch();
  });

  return { isLoading };
};