import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { Transaction } from "@/types/api";

import { getInfiniteTransactionsQueryOptions } from "./get-transactions";

export const updateTransactionInputSchema = z.object({
  status: z.string().min(1, "Status is required"),
});

export type UpdateTransactionInput = z.infer<typeof updateTransactionInputSchema>;

export const updateTransaction = ({
  barter_transaction_id,
  data,
}: {
  barter_transaction_id: string;
  data: UpdateTransactionInput;
}): Promise<{ data: Transaction }> => {
  return api.patch(`/barter_transactions/${barter_transaction_id}`, data);
};

type UseUpdateTransactionOptions = {
  mutationConfig?: MutationConfig<typeof updateTransaction>;
};

export const useUpdateTransaction = ({ mutationConfig }: UseUpdateTransactionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteTransactionsQueryOptions({ mode: "incoming" }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getInfiniteTransactionsQueryOptions({ mode: "outgoing" }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getInfiniteTransactionsQueryOptions({ mode: "ongoing" }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getInfiniteTransactionsQueryOptions({ mode: "history" }).queryKey,
      });

      useStatusDialog.getState().setStatusDialog({
        type: "success",
        title: `Barter ${data.data.status}`,
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateTransaction,
  });
};
