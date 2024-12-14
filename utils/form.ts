export const filterEmptyValues = (values: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== null && value !== ""));
};
