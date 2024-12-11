import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { getInfiniteProvideListQueryOptions } from "@/features/provide/api/get-provide-list";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { BarterTransaction } from "@/types/api";

import { getInfiniteBarterRequestsQueryOptions } from "./get-barter-requests";

export const updateDiscussionInputSchema = z.object({
  status: z.string().min(1, "Status is required"),
});

export type UpdateDiscussionInput = z.infer<typeof updateDiscussionInputSchema>;

export const updateBarterRequest = ({
  barterTransactionId,
  data,
}: {
  barterTransactionId: string;
  data: UpdateDiscussionInput;
}): Promise<{ data: BarterTransaction }> => {
  return api.patch(`/barter_transactions/${barterTransactionId}`, data);
};

type UseUpdateBarterRequestOptions = {
  mutationConfig?: MutationConfig<typeof updateBarterRequest>;
};

export const useUpdateBarterRequest = ({ mutationConfig }: UseUpdateBarterRequestOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteBarterRequestsQueryOptions(data.data.barter_service_id).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getInfiniteProvideListQueryOptions().queryKey,
      });

      useStatusDialog.getState().setStatusDialog({
        type: "success",
        title: `Request ${data.data.status}`,
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateBarterRequest,
  });
};
