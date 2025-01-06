import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number) => {
  if (delay < 0) {
    throw new Error("Delay must be a non-negative number");
  }

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
