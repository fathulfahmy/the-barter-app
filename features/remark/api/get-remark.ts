import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Remark } from "@/types/api";

/* ======================================== AXIOS */
export const getRemark = ({ barter_remark_id }: { barter_remark_id: string }): Promise<{ data: Remark }> => {
  return api.get(`/barter_remarks/${barter_remark_id}`);
};

/* ======================================== REACT QUERY */
export const getRemarkQueryOptions = (barter_remark_id: string) => {
  return queryOptions({
    queryKey: ["remark", barter_remark_id],
    queryFn: () => getRemark({ barter_remark_id }),
  });
};

/* ======================================== HOOK */
type UseRemarkOptions = {
  barter_remark_id: string;
  queryConfig?: QueryConfig<typeof getRemarkQueryOptions>;
};

export const useRemark = ({ barter_remark_id, queryConfig }: UseRemarkOptions) => {
  return useQuery({
    ...getRemarkQueryOptions(barter_remark_id),
    ...queryConfig,
  });
};
