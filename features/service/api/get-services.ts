import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Paginator, Service } from "@/types/api";

type Mode = "acquire" | "provide";

/* ======================================== AXIOS */
export const getServices = ({
  mode,
  page = 1,
  search = "",
  categories = [],
}: {
  mode: Mode;
  page?: number;
  search?: string;
  categories?: string[];
}): Promise<{ data: Paginator<Service> }> => {
  const params: Record<string, any> = {
    mode,
    page,
  };

  if (search) {
    params.search = search;
  }

  if (categories && categories.length > 0) {
    params.categories = categories;
  }

  return api.get(`/barter_services`, { params });
};

/* ======================================== REACT QUERY */
export const getInfiniteServicesQueryOptions = ({
  mode,
  search,
  categories,
}: {
  mode: Mode;
  search?: string;
  categories?: string[];
}) => {
  return infiniteQueryOptions({
    queryKey: ["services", mode, search, categories],
    queryFn: ({ pageParam = 1 }) => {
      return getServices({
        mode,
        page: pageParam as number,
        search,
        categories,
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
type UseInfiniteServicesOptions = {
  mode: Mode;
  page?: number;
  search?: string;
  categories?: string[];
  queryConfig?: QueryConfig<typeof getInfiniteServicesQueryOptions>;
};

export const useInfiniteServices = ({ mode, search, categories, queryConfig }: UseInfiniteServicesOptions) => {
  return useInfiniteQuery({
    ...getInfiniteServicesQueryOptions({ mode, search, categories }),
    ...queryConfig,
  });
};
