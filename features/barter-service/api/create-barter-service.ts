import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { getInfiniteProvideListQueryOptions } from "@/features/provide/api/get-provide-list";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { BarterService } from "@/types/api";

export const createBarterServiceInputSchema = z.object({
  barter_category_id: z.string().min(1, "Barter category is required"),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  min_price: z.coerce.number().min(1).max(99999999.99),
  max_price: z.coerce.number().min(1).max(99999999.99),
  price_unit: z.string().min(1, "Price unit is required").max(255),
});

export type CreateBarterServiceInput = z.infer<typeof createBarterServiceInputSchema>;

export const createBarterService = ({ data }: { data: CreateBarterServiceInput }): Promise<BarterService> => {
  return api.post(`/barter_services`, data);
};

type UseCreateBarterServiceOptions = {
  mutationConfig?: MutationConfig<typeof createBarterService>;
};

export const useCreateBarterService = ({ mutationConfig }: UseCreateBarterServiceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteProvideListQueryOptions().queryKey,
      });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createBarterService,
  });
};
