import { DefaultOptions, UseMutationOptions } from "@tanstack/react-query";

export const defaultQueryConfig = {
  queries: {
    retry: false,
  },
} satisfies DefaultOptions;

export const alwaysRefetchQueryConfig = {
  refetchInterval: 2000,
  staleTime: 0,
};

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> = Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Partial<Omit<ReturnType<T>, "queryKey" | "queryFn">>;

export type MutationConfig<MutationFnType extends (...args: any) => Promise<any>> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
