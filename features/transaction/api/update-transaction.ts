import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { Transaction } from "@/types/api";

/* ======================================== VALIDATION */
export const updateTransactionInputSchema = z.object({
  status: z.string().min(1, "Status is required"),
});

export type UpdateTransactionInput = z.infer<typeof updateTransactionInputSchema>;

/* ======================================== AXIOS */
export const updateTransaction = ({
  barter_transaction_id,
  data,
}: {
  barter_transaction_id: string;
  data: UpdateTransactionInput;
}): Promise<{ data: Transaction }> => {
  return api.patch(`/barter_transactions/${barter_transaction_id}`, data);
};

/* ======================================== HOOK */
type UseUpdateTransactionOptions = {
  mutationConfig?: MutationConfig<typeof updateTransaction>;
};

export const useUpdateTransaction = ({ mutationConfig }: UseUpdateTransactionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        refetchType: "all",
      });

      useStatusDialog.getState().setStatusDialog({
        type: "success",
        title: "Barter updated",
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateTransaction,
  });
};
