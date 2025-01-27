import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { getInfiniteServicesQueryOptions } from "@/features/service/api/get-services";
import { getInfiniteTransactionsQueryOptions } from "@/features/transaction/api/get-transactions";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { Review } from "@/types/api";

/* ======================================== VALIDATION */
export const createReviewInputSchema = z.object({
  barter_transaction_id: z.string().min(1, "Transaction is required"),
  description: z.string().min(1, "Description is required").max(65535),
  rating: z.coerce.number().min(0, "Minimum rating is 0.0").max(5, "Maximum rating is 5.0"),
});

export type CreateReviewInput = z.infer<typeof createReviewInputSchema>;

/* ======================================== AXIOS */
export const createReview = ({ data }: { data: CreateReviewInput }): Promise<{ data: Review }> => {
  return api.post(`/barter_reviews`, data);
};

/* ======================================== HOOK */
type UseCreateReviewOptions = {
  mutationConfig?: MutationConfig<typeof createReview>;
};

export const useCreateReview = ({ mutationConfig }: UseCreateReviewOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      useStatusDialog.getState().setStatusDialog({
        type: "success",
        title: "Barter reviewed",
      });

      queryClient.invalidateQueries({
        queryKey: getInfiniteTransactionsQueryOptions({ mode: "ongoing" }).queryKey,
        exact: false,
        refetchType: "all",
      });

      queryClient.invalidateQueries({
        queryKey: getInfiniteTransactionsQueryOptions({ mode: "history" }).queryKey,
        exact: false,
        refetchType: "all",
      });

      queryClient.invalidateQueries({
        queryKey: getInfiniteServicesQueryOptions({ mode: "provide" }).queryKey,
        exact: false,
        refetchType: "all",
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: createReview,
  });
};
