import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { getInfiniteTransactionsQueryOptions } from "@/features/transaction/api/get-transactions";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { Remark } from "@/types/api";

import { getRemarkQueryOptions } from "./get-remark";
import { getInfiniteRemarksQueryOptions } from "./get-remarks";

/* ======================================== VALIDATION */

export const updateRemarkInputSchema = z.object({
  datetime: z.date().nullable().optional(),
  address: z.string().max(65535).nullable().optional(),
  deliverables: z.string().max(65535).array().nullable().optional(),
  note: z.string().max(65535).nullable().optional(),
});

export type UpdateRemarkInput = z.infer<typeof updateRemarkInputSchema>;

/* ======================================== AXIOS */
export const updateRemark = ({
  barter_remark_id,
  data,
}: {
  barter_remark_id: string;
  data: UpdateRemarkInput;
}): Promise<{ data: Remark }> => {
  return api.patch(`/barter_remarks/${barter_remark_id}`, data);
};

/* ======================================== HOOK */
type UseUpdateRemarkOptions = {
  mutationConfig?: MutationConfig<typeof updateRemark>;
};

export const useUpdateRemark = ({ mutationConfig }: UseUpdateRemarkOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      useStatusDialog.getState().setStatusDialog({
        type: "success",
        title: "Remark updated",
      });

      queryClient.invalidateQueries({
        queryKey: getRemarkQueryOptions(data.data.id).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getInfiniteRemarksQueryOptions().queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getInfiniteTransactionsQueryOptions({ mode: "ongoing" }).queryKey,
        refetchType: "all",
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateRemark,
  });
};
