import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { BarterTransaction, Paginator } from "@/types/api";

export const getBarterRequests = ({
  barterServiceId,
  page = 1,
}: {
  barterServiceId: string;
  page?: number;
}): Promise<{ data: Paginator<BarterTransaction> }> => {
  return api.get(`/barter_transactions/${barterServiceId}/requests`, {
    params: {
      page,
    },
  });
};

export const getInfiniteBarterRequestsQueryOptions = (barterServiceId: string) => {
  return infiniteQueryOptions({
    queryKey: ["barter-requests", barterServiceId],
    queryFn: ({ pageParam = 1 }) => {
      return getBarterRequests({ barterServiceId, page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page === lastPage.data.total) return undefined;
      const nextPage = lastPage.data.current_page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

type UseBarterRequestsOptions = {
  barterServiceId: string;
  queryConfig?: QueryConfig<typeof getInfiniteBarterRequestsQueryOptions>;
};

export const useInfiniteBarterRequests = ({ barterServiceId, queryConfig }: UseBarterRequestsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteBarterRequestsQueryOptions(barterServiceId),
    ...queryConfig,
  });
};
