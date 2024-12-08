import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { BarterTransaction, Paginator } from "@/types/api";

export const getBarterRecords = ({
  barterServiceId,
  page = 1,
}: {
  barterServiceId: string;
  page?: number;
}): Promise<{ data: Paginator<BarterTransaction> }> => {
  const response = api.get(`/barter_transactions/${barterServiceId}/records`, {
    params: {
      page,
    },
  });
  return response;
};

export const getInfiniteBarterRecordsQueryOptions = (barterServiceId: string) => {
  return infiniteQueryOptions({
    queryKey: ["barter-records", barterServiceId],
    queryFn: ({ pageParam = 1 }) => {
      return getBarterRecords({ barterServiceId, page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page === lastPage.data.total) return undefined;
      const nextPage = lastPage.data.current_page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

type UseBarterRecordsOptions = {
  barterServiceId: string;
  queryConfig?: QueryConfig<typeof getInfiniteBarterRecordsQueryOptions>;
};

export const useInfiniteBarterRecords = ({ barterServiceId, queryConfig }: UseBarterRecordsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteBarterRecordsQueryOptions(barterServiceId),
    ...queryConfig,
  });
};
