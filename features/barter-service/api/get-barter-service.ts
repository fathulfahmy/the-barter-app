import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { BarterService } from "@/types/api";

export const getBarterService = ({
  barterServiceId,
}: {
  barterServiceId: string;
}): Promise<{ data: BarterService }> => {
  return api.get(`/barter_services/${barterServiceId}`);
};

export const getBarterServiceQueryOptions = (barterServiceId: string) => {
  return queryOptions({
    queryKey: ["barter-service", barterServiceId],
    queryFn: () => getBarterService({ barterServiceId }),
  });
};

type UseBarterServiceOptions = {
  barterServiceId: string;
  queryConfig?: QueryConfig<typeof getBarterServiceQueryOptions>;
};

export const useBarterServiceQuery = ({ barterServiceId, queryConfig }: UseBarterServiceOptions) => {
  return useQuery({
    ...getBarterServiceQueryOptions(barterServiceId),
    ...queryConfig,
  });
};
