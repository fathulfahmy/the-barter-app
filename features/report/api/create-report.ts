import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";

/* ======================================== VALIDATION */
export const createReportInputSchema = z.object({
  user_report_reason_id: z.string().min(1, "Reason is required"),
  model_id: z.string().min(1, "Model ID is required"),
  model_name: z.string().min(1, "Model is required").max(255),
});

export type CreateReportInput = z.infer<typeof createReportInputSchema>;

/* ======================================== AXIOS */
export const createReport = ({ data }: { data: CreateReportInput }): Promise<Report> => {
  return api.post(`/user_reports`, data);
};

/* ======================================== HOOK */
type UseCreateReportOptions = {
  mutationConfig?: MutationConfig<typeof createReport>;
};

export const useCreateReport = ({ mutationConfig }: UseCreateReportOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      useStatusDialog.getState().setStatusDialog({
        type: "success",
        title: "Report sent",
      });

      router.dismiss();

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createReport,
  });
};
