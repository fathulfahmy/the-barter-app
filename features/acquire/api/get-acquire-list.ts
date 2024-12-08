import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { BarterService, Paginator } from "@/types/api";

export const getAcquireList = ({ page = 1 }: { page?: number }): Promise<{ data: Paginator<BarterService> }> => {
  return api.get(`/barter_services/acquire`, {
    params: {
      page,
    },
  });
};

export const getInfiniteAcquireListQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["acquire-list"],
    queryFn: ({ pageParam = 1 }) => {
      return getAcquireList({ page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page === lastPage.data.total) return undefined;
      const nextPage = lastPage.data.current_page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

export const useInfiniteAcquireList = () => {
  return useInfiniteQuery({
    ...getInfiniteAcquireListQueryOptions(),
  });
};
