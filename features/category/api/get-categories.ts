import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { Category } from "@/types/api";

export const getCategories = (): Promise<{ data: Category[] }> => {
  return api.get(`/barter_categories`);
};

export const getCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};

export const useCategories = () => {
  return useQuery({
    ...getCategoriesQueryOptions(),
  });
};
