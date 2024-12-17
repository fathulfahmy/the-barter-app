import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { zodMedia } from "@/lib/zod";
import { Service } from "@/types/api";
import { createFormData } from "@/utils/form";

import { getInfiniteServicesQueryOptions } from "./get-services";

export const createServiceInputSchema = z.object({
  barter_category_id: z.string().min(1, "Barter category is required"),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  min_price: z.coerce.number().min(1).max(99999999.99),
  max_price: z.coerce.number().min(1).max(99999999.99),
  price_unit: z.string().min(1, "Price unit is required").max(255),
  images: z
    .array(zodMedia().or(z.instanceof(File)))
    .optional()
    .nullable(),
});

export type CreateServiceInput = z.infer<typeof createServiceInputSchema>;

export const createService = ({ data }: { data: CreateServiceInput }): Promise<Service> => {
  const formData = createFormData(data);

  return api.post(`/barter_services`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type UseCreateServiceOptions = {
  mutationConfig?: MutationConfig<typeof createService>;
};

export const useCreateService = ({ mutationConfig }: UseCreateServiceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteServicesQueryOptions({ mode: "provide" }).queryKey,
      });

      useStatusDialog.getState().setStatusDialog({
        type: "success",
        title: "Service created",
      });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createService,
  });
};
