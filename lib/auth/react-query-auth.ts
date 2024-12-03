import React from "react";

import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { User as ApiUser, AuthResponse } from "@/types/api";

import { useToken } from "./token";

export interface ReactQueryAuthConfig<User, LoginInput, RegisterInput> {
  userFn: QueryFunction<User, QueryKey>;
  loginFn: MutationFunction<AuthResponse, LoginInput>;
  registerFn: MutationFunction<AuthResponse, RegisterInput>;
  logoutFn: MutationFunction<unknown, unknown>;
  userKey?: QueryKey;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function configureAuth<User, Error, LoginInput, RegisterInput>(
  config: ReactQueryAuthConfig<User, LoginInput, RegisterInput>,
) {
  const { userFn, userKey = ["authenticated-user"], loginFn, registerFn, logoutFn } = config;

  const useUser = (options?: Omit<UseQueryOptions<User, Error, User, QueryKey>, "queryKey" | "queryFn">) =>
    useQuery({
      queryKey: userKey,
      queryFn: userFn,
      ...options,
    });

  const useLogin = (options?: Omit<UseMutationOptions<AuthResponse, Error, LoginInput>, "mutationFn">) => {
    const queryClient = useQueryClient();
    const { addToken } = useToken();
    const setUser = React.useCallback((data: ApiUser) => queryClient.setQueryData(userKey, data), [queryClient]);

    return useMutation({
      mutationFn: loginFn,
      ...options,
      onSuccess: (response, ...rest) => {
        addToken(response.token);
        setUser(response.user);
        options?.onSuccess?.(response, ...rest);
      },
    });
  };

  const useRegister = (options?: Omit<UseMutationOptions<AuthResponse, Error, RegisterInput>, "mutationFn">) => {
    const queryClient = useQueryClient();
    const { addToken } = useToken();
    const setUser = React.useCallback((data: ApiUser) => queryClient.setQueryData(userKey, data), [queryClient]);

    return useMutation({
      mutationFn: registerFn,
      ...options,
      onSuccess: (response, ...rest) => {
        addToken(response.token);
        setUser(response.user);
        options?.onSuccess?.(response, ...rest);
      },
    });
  };

  const useLogout = (options?: UseMutationOptions<unknown, Error, unknown>) => {
    const queryClient = useQueryClient();
    const { removeToken } = useToken();
    const setUser = React.useCallback((data: ApiUser | null) => queryClient.setQueryData(userKey, data), [queryClient]);

    return useMutation({
      mutationFn: logoutFn,
      ...options,
      onSuccess: (...args) => {
        removeToken();
        setUser(null);
        options?.onSuccess?.(...args);
      },
    });
  };

  return {
    useUser,
    useLogin,
    useRegister,
    useLogout,
  };
}
