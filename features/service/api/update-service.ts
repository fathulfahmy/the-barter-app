import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { Service } from "@/types/api";

import { getInfiniteServicesQueryOptions } from "./get-services";

export const updateServiceInputSchema = z.object({
  status: z.string().min(1, "Status is required"),
});

export type UpdateServiceInput = z.infer<typeof updateServiceInputSchema>;

export const updateService = ({
  barter_service_id,
  data,
}: {
  barter_service_id: string;
  data: UpdateServiceInput;
}): Promise<{ data: Service }> => {
  return api.patch(`/barter_services/${barter_service_id}`, data);
};

type UseUpdateServiceOptions = {
  mutationConfig?: MutationConfig<typeof updateService>;
};

export const useUpdateService = ({ mutationConfig }: UseUpdateServiceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteServicesQueryOptions({ mode: "provide" }).queryKey,
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateService,
  });
};
