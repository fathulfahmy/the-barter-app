import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { Transaction } from "@/types/api";

import { getInfiniteTransactionsQueryOptions } from "./get-transactions";

export const createTransactionInputSchema = z.object({
  barter_service_id: z.string().min(1, "Service is required"),
  amount: z.coerce.number().nonnegative().nullable(),
  barter_service_ids: z.string().array().nullable(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionInputSchema>;

export const createTransaction = ({ data }: { data: CreateTransactionInput }): Promise<{ data: Transaction }> => {
  return api.post(`/barter_transactions`, data);
};

type UseCreateTransactionOptions = {
  mutationConfig?: MutationConfig<typeof createTransaction>;
};

export const useCreateTransaction = ({ mutationConfig }: UseCreateTransactionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteTransactionsQueryOptions({ mode: "outgoing" }).queryKey,
      });

      useStatusDialog.getState().setStatusDialog({
        type: "success",
        title: "Request sent",
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: createTransaction,
  });
};
