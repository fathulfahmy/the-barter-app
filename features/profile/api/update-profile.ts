import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStatusDialog } from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { User } from "@/types/api";

export const updateProfileInputSchema = z
  .object({
    avatar: z.string().optional().nullable(),
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address.").optional(),
    password: z
      .string()
      .optional()
      .refine((value) => !value || value.length >= 8, {
        message: "Password must be at least 8 characters long",
      })
      .refine((value) => !value || /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => !value || /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((value) => !value || /[0-9]/.test(value), {
        message: "Password must contain at least one digit",
      })
      .refine((value) => !value || /[^a-zA-Z0-9]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    password_confirmation: z.string().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const updateProfile = ({ user_id, data }: { user_id: string; data: UpdateProfileInput }): Promise<User> => {
  return api.patch(`/profile/${user_id}`, data);
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
