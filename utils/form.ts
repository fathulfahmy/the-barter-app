export const filterEmptyValues = (values: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== null && value !== ""));
};

export const isMedia = (value: any): boolean => {
  return typeof value === "object" && value !== null && "uri" in value;
};

const appendFormData = (formData: FormData, key: string, value: any) => {
  if (value === null || value === undefined) return;

  if (isMedia(value)) {
    formData.append(key, value);
  } else if (typeof value === "object" && value !== null) {
    formData.append(key, JSON.stringify(value));
  } else {
    formData.append(key, value);
  }
};

export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendFormData(formData, `${key}[${index}]`, item);
      });
    } else {
      appendFormData(formData, key, value);
    }
  }
  return formData;
};
