import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Service } from "@/types/api";

export const getService = ({ barter_service_id }: { barter_service_id: string }): Promise<{ data: Service }> => {
  return api.get(`/barter_services/${barter_service_id}`);
};

export const getServiceQueryOptions = (barter_service_id: string) => {
  return queryOptions({
    queryKey: ["service", barter_service_id],
    queryFn: () => getService({ barter_service_id }),
  });
};

type UseServiceOptions = {
  barter_service_id: string;
  queryConfig?: QueryConfig<typeof getServiceQueryOptions>;
};

export const useService = ({ barter_service_id, queryConfig }: UseServiceOptions) => {
  return useQuery({
    ...getServiceQueryOptions(barter_service_id),
    ...queryConfig,
  });
};
