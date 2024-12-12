import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { Paginator, Review } from "@/types/api";

export const getReviews = ({ page = 1 }: { page?: number }): Promise<{ data: Paginator<Review> }> => {
  return api.get(`/barter_reviews`, {
    params: {
      page,
    },
  });
};

export const getInfiniteReviewsQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["reviews"],
    queryFn: ({ pageParam = 1 }) => {
      return getReviews({ page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page === lastPage.data.total) return undefined;
      const nextPage = lastPage.data.current_page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

export const useInfiniteReviews = () => {
  return useInfiniteQuery({
    ...getInfiniteReviewsQueryOptions(),
  });
};
