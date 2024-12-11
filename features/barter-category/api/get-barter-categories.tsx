import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { BarterCategory } from "@/types/api";

export const getBarterCategories = (): Promise<{ data: BarterCategory[] }> => {
  return api.get(`/barter_categories`);
};

export const getBarterCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["barter-categories"],
    queryFn: () => getBarterCategories(),
  });
};

export const useBarterCategories = () => {
  return useQuery({
    ...getBarterCategoriesQueryOptions(),
  });
};
