import { z } from "zod";

/* ======================================== MEDIA INPUT VALIDATOR
                                            { 
                                              uri: 
                                              name: 
                                              type:
                                            } 
*/
export const zodMedia = () => {
  return z.object({
    uri: z.string(),
    name: z
      .string()
      .transform((name) => name ?? `image_${Date.now()}.jpg`)
      .nullable(),
    type: z
      .string()
      .transform((type) => type ?? "image/jpeg")
      .nullable(),
  });
};

/* ======================================== PASSWORD INPUT VALIDATOR
                                            Example1! 
*/
export const zodPassword = () => {
  return z
    .string()
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
    });
};
