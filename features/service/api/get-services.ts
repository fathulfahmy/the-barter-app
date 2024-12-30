import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Paginator, Service } from "@/types/api";

type Mode = "acquire" | "provide";

export const getServices = ({
  mode,
  page = 1,
}: {
  mode: Mode;
  page?: number;
}): Promise<{ data: Paginator<Service> }> => {
  return api.get(`/barter_services`, {
    params: {
      mode,
      page,
    },
  });
};

export const getInfiniteServicesQueryOptions = ({ mode }: { mode: Mode }) => {
  return infiniteQueryOptions({
    queryKey: ["services", mode],
    queryFn: ({ pageParam = 1 }) => {
      return getServices({
        mode,
        page: pageParam as number,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page === lastPage.data.total) return undefined;
      const nextPage = lastPage.data.current_page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

type UseInfiniteServicesOptions = {
  mode: Mode;
  page?: number;
  queryConfig?: QueryConfig<typeof getInfiniteServicesQueryOptions>;
};

export const useInfiniteServices = ({ mode, queryConfig }: UseInfiniteServicesOptions) => {
  return useInfiniteQuery({
    ...getInfiniteServicesQueryOptions({ mode }),
    ...queryConfig,
  });
};
