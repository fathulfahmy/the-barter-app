import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { BarterService, Paginator } from "@/types/api";

export const getProvideList = ({ page = 1 }: { page?: number }): Promise<{ data: Paginator<BarterService> }> => {
  return api.get(`/barter_services/provide`, {
    params: {
      page,
    },
  });
};

export const getInfiniteProvideListQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["provide-list"],
    queryFn: ({ pageParam = 1 }) => {
      return getProvideList({ page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page === lastPage.data.total) return undefined;
      const nextPage = lastPage.data.current_page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

export const useInfiniteProvideList = () => {
  return useInfiniteQuery({
    ...getInfiniteProvideListQueryOptions(),
  });
};
