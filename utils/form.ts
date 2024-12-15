import { z } from "zod";

export const filterEmptyValues = (values: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== null && value !== ""));
};

export const getFormData = ({ data }: { data: object }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export const appendMediaFormData = ({ formData, data, name }: { formData: FormData; data: object; name: string }) => {
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === `${name}`) {
        const media = value as { uri: string; name?: string | null; type?: string | null };

        formData.append(`${name}`, {
          uri: media.uri,
          name: media.name,
          type: media.type,
        } as any);
      }
    }
  });
};

export const appendMultipleMediaFormData = ({
  formData,
  data,
  name,
}: {
  formData: FormData;
  data: object;
  name: string;
}) => {
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === `${name}`) {
        const medias = value as { uri: string; name?: string | null; type?: string | null }[];
        medias?.forEach((media, index) => {
          formData.append(`${name}[${index}]`, {
            uri: media.uri,
            name: media.name,
            type: media.type,
          } as any);
        });
      }
    }
  });
};

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
