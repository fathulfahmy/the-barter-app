import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { zodMedia, zodPassword } from "@/lib/zod";
import { User } from "@/types/api";
import { createFormData } from "@/utils/form";

/* ======================================== VALIDATION */
export const updateProfileInputSchema = z
  .object({
    avatar: zodMedia().or(z.instanceof(File)).optional().nullable(),
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address.").optional(),
    password: zodPassword().optional(),
    password_confirmation: z.string().optional(),
    bank_name: z.string().min(1, "Bank name is required").optional(),
    bank_account_number: z.string().min(1, "Bank account number is required").optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

/* ======================================== AXIOS */
export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const updateProfile = ({ user_id, data }: { user_id: string; data: UpdateProfileInput }): Promise<User> => {
  const formData = createFormData(data);

  formData.append("_method", "patch");

  return api.post(`/users/${user_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ======================================== HOOK */
type UseUpdateProfileOptions = {
  mutationConfig?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({ mutationConfig }: UseUpdateProfileOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["authenticated-user"],
        exact: false,
        refetchType: "all",
      });

      useStatusDialog.getState().setStatusDialog({
        type: "success",
        title: "Profile updated",
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateProfile,
  });
};
