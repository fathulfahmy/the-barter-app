import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { getInfiniteProvideListQueryOptions } from "@/features/provide/api/get-provide-list";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { BarterService } from "@/types/api";

export const updateBarterServiceInputSchema = z.object({
  status: z.string().min(1, "Status is required"),
});

export type UpdateBarterServiceInput = z.infer<typeof updateBarterServiceInputSchema>;

export const updateBarterService = ({
  barterServiceId,
  data,
}: {
  barterServiceId: string;
  data: UpdateBarterServiceInput;
}): Promise<{ data: BarterService }> => {
  return api.patch(`/barter_services/${barterServiceId}`, data);
};

type UseUpdateBarterServiceOptions = {
  mutationConfig?: MutationConfig<typeof updateBarterService>;
};

export const useUpdateBarterService = ({ mutationConfig }: UseUpdateBarterServiceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteProvideListQueryOptions().queryKey,
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateBarterService,
  });
};
