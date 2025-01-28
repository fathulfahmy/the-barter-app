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

import { client } from "../stream-chat/client";
import { useAuthToken } from "./token";

/* ======================================== PROPS */
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

/* ======================================== HOOKS */
export function configureAuth<User, Error, LoginInput, RegisterInput>(
  config: ReactQueryAuthConfig<User, LoginInput, RegisterInput>,
) {
  const { userFn, userKey = ["authenticated-user"], loginFn, registerFn, logoutFn } = config;

  /* ======================================== AUTH USER */
  const useUser = (options?: Omit<UseQueryOptions<User, Error, User, QueryKey>, "queryKey" | "queryFn">) =>
    useQuery({
      queryKey: userKey,
      queryFn: userFn,
      ...options,
    });

  /* ======================================== LOGIN */
  const useLogin = (options?: Omit<UseMutationOptions<AuthResponse, Error, LoginInput>, "mutationFn">) => {
    const queryClient = useQueryClient();
    const { addToken } = useAuthToken();
    const setUser = React.useCallback((data: ApiUser) => queryClient.setQueryData(userKey, data), [queryClient]);
    const setChatUser = async (data: AuthResponse) => {
      await client.connectUser(
        {
          id: String(data.user.id),
        },
        data.chat_token,
      );
    };

    return useMutation({
      mutationFn: loginFn,
      ...options,
      onSuccess: (response, ...rest) => {
        addToken(response.auth_token);
        setUser(response.user);
        setChatUser(response);
        options?.onSuccess?.(response, ...rest);
      },
    });
  };

  /* ======================================== REGISTER */
  const useRegister = (options?: Omit<UseMutationOptions<AuthResponse, Error, RegisterInput>, "mutationFn">) => {
    const queryClient = useQueryClient();
    const { addToken } = useAuthToken();
    const setUser = React.useCallback((data: ApiUser) => queryClient.setQueryData(userKey, data), [queryClient]);
    const setChatUser = async (data: AuthResponse) => {
      await client.connectUser(
        {
          id: String(data.user.id),
        },
        data.chat_token,
      );
    };

    return useMutation({
      mutationFn: registerFn,
      ...options,
      onSuccess: (response, ...rest) => {
        addToken(response.auth_token);
        setUser(response.user);
        setChatUser(response);
        options?.onSuccess?.(response, ...rest);
      },
    });
  };

  /* ======================================== LOGOUT */
  const useLogout = (options?: UseMutationOptions<unknown, Error, unknown>) => {
    const queryClient = useQueryClient();
    const { removeToken } = useAuthToken();
    const setUser = React.useCallback((data: ApiUser | null) => queryClient.setQueryData(userKey, data), [queryClient]);
    const setChatUser = async () => await client.disconnectUser();

    return useMutation({
      mutationFn: logoutFn,
      ...options,
      onSuccess: (...args) => {
        queryClient.cancelQueries();
        queryClient.clear();
        removeToken();
        setUser(null);
        setChatUser();
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
