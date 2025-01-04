import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { Category } from "@/types/api";

/* ======================================== AXIOS */
export const getCategories = (): Promise<{ data: Category[] }> => {
  return api.get(`/barter_categories`);
};

/* ======================================== REACT QUERY */
export const getCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};

/* ======================================== HOOK */
export const useCategories = () => {
  return useQuery({
    ...getCategoriesQueryOptions(),
  });
};
