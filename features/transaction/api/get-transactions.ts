import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Paginator, Transaction } from "@/types/api";

type Mode = "incoming" | "outgoing" | "ongoing" | "history";

/* ======================================== AXIOS */
export const getTransactions = ({
  mode,
  barter_service_id,
  search = "",
  page = 1,
}: {
  mode: Mode;
  barter_service_id?: string;
  search?: string;
  page?: number;
}): Promise<{ data: Paginator<Transaction> }> => {
  const params: Record<string, any> = {
    mode,
    page,
  };

  if (search) {
    params.search = search;
  }

  if (barter_service_id) {
    params.barter_service_id = barter_service_id;
  }

  return api.get(`/barter_transactions`, { params });
};

/* ======================================== REACT QUERY */
export const getInfiniteTransactionsQueryOptions = ({
  mode,
  search,
  barter_service_id,
}: {
  mode: Mode;
  search?: string;
  barter_service_id?: string;
}) => {
  return infiniteQueryOptions({
    queryKey: ["transactions", mode, barter_service_id, search],
    queryFn: ({ pageParam = 1 }) => {
      return getTransactions({
        mode,
        barter_service_id,
        search,
        page: pageParam as number,
      });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.data) {
        return undefined;
      }

      if (lastPage.data.current_page === lastPage.data.last_page) {
        return undefined;
      }

      const nextPage = lastPage.data.current_page + 1;
      return nextPage;
    },
    initialPageParam: 1,
    placeholderData: (previousData, previousQuery) => previousData,
  });
};

/* ======================================== HOOK */
type UseInfiniteTransactionsOptions = {
  mode: Mode;
  barter_service_id?: string;
  search?: string;
  page?: number;
  queryConfig?: QueryConfig<typeof getInfiniteTransactionsQueryOptions>;
};

export const useInfiniteTransactions = ({
  mode,
  barter_service_id,
  search,
  queryConfig,
}: UseInfiniteTransactionsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteTransactionsQueryOptions({ mode, barter_service_id, search }),
    ...queryConfig,
  });
};
