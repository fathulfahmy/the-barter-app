import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { zodMedia, zodPassword } from "@/lib/zod";
import { User } from "@/types/api";
import { createFormData } from "@/utils/form";

export const updateProfileInputSchema = z
  .object({
    avatar: zodMedia().or(z.instanceof(File)).optional().nullable(),
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address.").optional(),
    password: zodPassword().optional(),
    password_confirmation: z.string().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

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
