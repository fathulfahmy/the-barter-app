import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Paginator, Remark } from "@/types/api";

/* ======================================== AXIOS */
export const getRemarks = ({ page = 1 }: { page?: number }): Promise<{ data: Paginator<Remark> }> => {
  const params: Record<string, any> = {
    page,
  };

  return api.get(`/barter_remarks`, { params });
};

/* ======================================== REACT QUERY */
export const getInfiniteRemarksQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["remarks"],
    queryFn: ({ pageParam = 1 }) => {
      return getRemarks({
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
type UseInfiniteRemarksOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getInfiniteRemarksQueryOptions>;
};

export const useInfiniteRemarks = ({ queryConfig }: UseInfiniteRemarksOptions = {}) => {
  return useInfiniteQuery({
    ...getInfiniteRemarksQueryOptions(),
    ...queryConfig,
  });
};
