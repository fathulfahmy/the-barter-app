import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";

import { getInfiniteServicesQueryOptions } from "./get-services";

export const deleteService = ({ service_id }: { service_id: string }) => {
  return api.delete(`/barter_services/${service_id}`);
};

type UseDeleteServiceOptions = {
  mutationConfig?: MutationConfig<typeof deleteService>;
};

export const useDeleteService = ({ mutationConfig }: UseDeleteServiceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteServicesQueryOptions({ mode: "provide" }).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteService,
  });
};
