import { DefaultOptions, UseMutationOptions } from "@tanstack/react-query";

/* ======================================== CONFIG */
export const defaultQueryConfig = {
  queries: {
    retry: false,
  },
} satisfies DefaultOptions;

/* ======================================== TYPES */
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> = Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Partial<Omit<ReturnType<T>, "queryKey" | "queryFn">>;

export type MutationConfig<MutationFnType extends (...args: any) => Promise<any>> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
