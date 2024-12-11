import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { BarterTransaction } from "@/types/api";

export const createBarterRequestInputSchema = z.object({
  barter_service_id: z.string().min(1, "Service is required"),
  amount: z.coerce.number().nonnegative().nullable(),
  barter_service_ids: z.string().array().nullable(),
});

export type CreateBarterRequestInput = z.infer<typeof createBarterRequestInputSchema>;

export const createBarterRequest = ({
  data,
}: {
  data: CreateBarterRequestInput;
}): Promise<{ data: BarterTransaction }> => {
  return api.post(`/barter_transactions`, data);
};

type UseCreateBarterRequestOptions = {
  mutationConfig?: MutationConfig<typeof createBarterRequest>;
};

export const useCreateBarterRequest = ({ mutationConfig }: UseCreateBarterRequestOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: createBarterRequest,
  });
};
