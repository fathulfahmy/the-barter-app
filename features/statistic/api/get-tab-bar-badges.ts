import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { TabBarBadges } from "@/types/api";

/* ======================================== AXIOS */
export const getTabBarBadges = (): Promise<{ data: TabBarBadges }> => {
  return api.get(`/stats/tab_bar_badges`);
};

/* ======================================== REACT QUERY */
export const getTabBarBadgesQueryOptions = () => {
  return queryOptions({
    queryKey: ["tab-bar-badges"],
    queryFn: () => getTabBarBadges(),
  });
};

/* ======================================== HOOK */
type UseTabBarBadgesOptions = {
  queryConfig?: QueryConfig<typeof getTabBarBadgesQueryOptions>;
};

export const useTabBarBadges = ({ queryConfig }: UseTabBarBadgesOptions = {}) => {
  return useQuery({
    ...getTabBarBadgesQueryOptions(),
    ...queryConfig,
  });
};
