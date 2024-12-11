import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { BarterReview } from "@/types/api";

export const getBarterReview = ({ barterReviewId }: { barterReviewId: string }): Promise<{ data: BarterReview }> => {
  return api.get(`/barter_reviews/${barterReviewId}`);
};

export const getBarterReviewQueryOptions = (barterReviewId: string) => {
  return queryOptions({
    queryKey: ["barter-service", barterReviewId],
    queryFn: () => getBarterReview({ barterReviewId }),
  });
};

type UseBarterReviewOptions = {
  barterReviewId: string;
  queryConfig?: QueryConfig<typeof getBarterReviewQueryOptions>;
};

export const useBarterReview = ({ barterReviewId, queryConfig }: UseBarterReviewOptions) => {
  return useQuery({
    ...getBarterReviewQueryOptions(barterReviewId),
    ...queryConfig,
  });
};
