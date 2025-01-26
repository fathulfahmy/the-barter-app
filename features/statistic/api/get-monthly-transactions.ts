import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { StatsData } from "@/types/api";

/* ======================================== AXIOS */
export const getMonthlyTransactions = (): Promise<{ data: StatsData[][] }> => {
  return api.get(`/stats/barter_transactions/monthly_group_by_status`);
};

/* ======================================== REACT QUERY */
export const getMonthlyTransactionsQueryOptions = () => {
  return queryOptions({
    queryKey: ["monthly-transactions"],
    queryFn: () => getMonthlyTransactions(),
    placeholderData: (previousData, previousQuery) => previousData,
  });
};

/* ======================================== HOOK */
type UseMonthlyTransactionsOptions = {
  queryConfig?: QueryConfig<typeof getMonthlyTransactionsQueryOptions>;
};

export const useMonthlyTransactions = ({ queryConfig }: UseMonthlyTransactionsOptions = {}) => {
  return useQuery({
    ...getMonthlyTransactionsQueryOptions(),
    ...queryConfig,
  });
};
