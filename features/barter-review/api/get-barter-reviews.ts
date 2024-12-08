import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { BarterReview, Paginator } from "@/types/api";

export const getBarterReviews = ({ page = 1 }: { page?: number }): Promise<{ data: Paginator<BarterReview> }> => {
  return api.get(`/barter_reviews`, {
    params: {
      page,
    },
  });
};

export const getInfiniteBarterReviewsQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["barter-reviews"],
    queryFn: ({ pageParam = 1 }) => {
      return getBarterReviews({ page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page === lastPage.data.total) return undefined;
      const nextPage = lastPage.data.current_page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

export const useInfiniteBarterReviews = () => {
  return useInfiniteQuery({
    ...getInfiniteBarterReviewsQueryOptions(),
  });
};
