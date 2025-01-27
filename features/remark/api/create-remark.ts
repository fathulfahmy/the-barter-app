import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { getInfiniteTransactionsQueryOptions } from "@/features/transaction/api/get-transactions";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { Remark } from "@/types/api";

import { getInfiniteRemarksQueryOptions } from "./get-remarks";

/* ======================================== VALIDATION */

export const createRemarkInputSchema = z.object({
  barter_transaction_id: z.string().min(1, "Transaction is required"),
  datetime: z.date().min(dayjs().startOf("day").toDate(), "Date/Time must be later than today").optional().nullable(),
  address: z.string().max(65535).optional().nullable(),
  deliverables: z.string().max(65535).array().optional().nullable(),
  note: z.string().max(65535).optional().nullable(),
});

export type CreateRemarkInput = z.infer<typeof createRemarkInputSchema>;

/* ======================================== AXIOS */
export const createRemark = ({ data }: { data: CreateRemarkInput }): Promise<{ data: Remark }> => {
  return api.post(`/barter_remarks`, data);
};

/* ======================================== HOOK */
type UseCreateRemarkOptions = {
  mutationConfig?: MutationConfig<typeof createRemark>;
};

export const useCreateRemark = ({ mutationConfig }: UseCreateRemarkOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      useStatusDialog.getState().setStatusDialog({
        type: "success",
        title: "Remark added",
      });

      queryClient.invalidateQueries({
        queryKey: getInfiniteRemarksQueryOptions().queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getInfiniteTransactionsQueryOptions({ mode: "ongoing" }).queryKey,
        exact: false,
        refetchType: "all",
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: createRemark,
  });
};
