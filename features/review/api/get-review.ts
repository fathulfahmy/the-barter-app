import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Review } from "@/types/api";

export const getReview = ({ reviewId }: { reviewId: string }): Promise<{ data: Review }> => {
  return api.get(`/barter_reviews/${reviewId}`);
};

export const getReviewQueryOptions = (reviewId: string) => {
  return queryOptions({
    queryKey: ["review", reviewId],
    queryFn: () => getReview({ reviewId }),
  });
};

type UseReviewOptions = {
  reviewId: string;
  queryConfig?: QueryConfig<typeof getReviewQueryOptions>;
};

export const useReview = ({ reviewId, queryConfig }: UseReviewOptions) => {
  return useQuery({
    ...getReviewQueryOptions(reviewId),
    ...queryConfig,
  });
};
