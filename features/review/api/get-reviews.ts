import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Paginator, Review } from "@/types/api";

export const getReviews = ({
  barter_service_id,
  page = 1,
}: {
  barter_service_id?: string;
  page?: number;
}): Promise<{ data: Paginator<Review> }> => {
  return api.get(`/barter_reviews`, {
    params: {
      page,
      ...(barter_service_id && { barter_service_id }),
    },
  });
};

export const getInfiniteReviewsQueryOptions = ({ barter_service_id }: { barter_service_id?: string }) => {
  return infiniteQueryOptions({
    queryKey: ["reviews", barter_service_id],
    queryFn: ({ pageParam = 1 }) => {
      return getReviews({
        barter_service_id,
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

type UseInfiniteReviewsOptions = {
  barter_service_id?: string;
  page?: number;
  queryConfig?: QueryConfig<typeof getInfiniteReviewsQueryOptions>;
};

export const useInfiniteReviews = ({ barter_service_id }: UseInfiniteReviewsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteReviewsQueryOptions({ barter_service_id }),
  });
};
