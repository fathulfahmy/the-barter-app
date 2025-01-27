import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { StatsData } from "@/types/api";

/* ======================================== AXIOS */
export const getTrendingServices = (): Promise<{ data: StatsData[] }> => {
  return api.get(`/stats/barter_services/monthly_trending`);
};

/* ======================================== REACT QUERY */
export const getTrendingServicesQueryOptions = () => {
  return queryOptions({
    queryKey: ["trending-services"],
    queryFn: () => getTrendingServices(),
  });
};

/* ======================================== HOOK */
type UseTrendingServicesOptions = {
  queryConfig?: QueryConfig<typeof getTrendingServicesQueryOptions>;
};

export const useTrendingServices = ({ queryConfig }: UseTrendingServicesOptions = {}) => {
  return useQuery({
    ...getTrendingServicesQueryOptions(),
    ...queryConfig,
  });
};
