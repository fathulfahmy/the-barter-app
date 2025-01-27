import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { zodMedia } from "@/lib/zod";
import { Service } from "@/types/api";
import { createFormData } from "@/utils/form";

import { getServiceQueryOptions } from "./get-service";
import { getInfiniteServicesQueryOptions } from "./get-services";

/* ======================================== VALIDATION */
export const updateServiceInputSchema = z.object({
  barter_category_id: z.string().min(1, "Barter category is required").optional(),
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1, "Description is required").max(65535).optional(),
  min_price: z.coerce.number().min(1).max(99999999.99).optional(),
  max_price: z.coerce.number().min(1).max(99999999.99).optional(),
  price_unit: z.string().min(1, "Price unit is required").max(255).optional(),
  status: z.string().min(1, "Status is required").optional(),
  images: z
    .array(zodMedia().or(z.instanceof(File)))
    .optional()
    .nullable(),
});

export type UpdateServiceInput = z.infer<typeof updateServiceInputSchema>;

/* ======================================== AXIOS */
export const updateService = ({
  barter_service_id,
  data,
}: {
  barter_service_id: string;
  data: UpdateServiceInput;
}): Promise<{ data: Service }> => {
  const formData = createFormData(data);

  formData.append("_method", "patch");

  return api.post(`/barter_services/${barter_service_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ======================================== HOOK */
type UseUpdateServiceOptions = {
  mutationConfig?: MutationConfig<typeof updateService>;
};

export const useUpdateService = ({ mutationConfig }: UseUpdateServiceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getServiceQueryOptions(data.data.id).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getInfiniteServicesQueryOptions({ mode: "provide" }).queryKey,
        refetchType: "all",
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateService,
  });
};
