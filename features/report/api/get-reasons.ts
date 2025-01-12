import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { Reason } from "@/types/api";

/* ======================================== AXIOS */
export const getReasons = (): Promise<{ data: Reason[] }> => {
  return api.get(`/user_report_reasons`);
};

/* ======================================== REACT QUERY */
export const getReasonsQueryOptions = () => {
  return queryOptions({
    queryKey: ["reasons"],
    queryFn: () => getReasons(),
  });
};

/* ======================================== HOOK */
export const useReasons = () => {
  return useQuery({
    ...getReasonsQueryOptions(),
  });
};
