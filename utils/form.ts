/* ======================================== REMOVE KEY VALUE PAIRS WITH EMPTY VALUES FROM AN OBJECT */
export const filterEmptyValues = (values: Record<string, any>): Record<string, any> => {
  const isEmpty = (value: any): boolean => {
    if (value === null || value === undefined || value === "") return true;
    if (Array.isArray(value)) return value.length === 0 || value.every(isEmpty);
    if (typeof value === "object" && !(value instanceof Date) && Object.keys(value).length === 0) return true;
    if (typeof value === "number" && isNaN(value)) return true;
    return false;
  };

  return Object.fromEntries(Object.entries(values).filter(([_, value]) => !isEmpty(value)));
};

/* ======================================== VALIDATE TYPE MEDIA { uri: } */
export const isMedia = (value: any): boolean => {
  return typeof value === "object" && value !== null && "uri" in value;
};

/* ======================================== APPEND KEY VALUE PAIR TO EXISTING FORM DATA */
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

/* ======================================== PARSE OBJECT TO FORM DATA */
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
