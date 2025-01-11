import React, { type PropsWithChildren, createContext, useContext, useEffect } from "react";

import { router, usePathname } from "expo-router";

import { useStorageState } from "@/hooks/use-storage-state";

import { api } from "../axios";

type Token = string | null;

/* ======================================== CONTEXT */
const AuthTokenContext = createContext<{
  addToken: (token: Token) => void;
  removeToken: () => void;
  token?: Token;
  isLoading: boolean;
}>({
  addToken: () => null,
  removeToken: () => null,
  token: null,
  isLoading: false,
});

/* ======================================== HOOK */
// This hook can be used to access the user info.
export function useAuthToken() {
  const value = useContext(AuthTokenContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuthToken must be wrapped in a <AuthTokenProvider />");
    }
  }

  return value;
}

/* ======================================== PROVIDER */
export const AuthTokenProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, token], setToken] = useStorageState("token");

  const route = usePathname();
  const unguardedRoutes = ["/login", "/register"];
  const isGuardedRoute = !unguardedRoutes.includes(route);

  useEffect(() => {
    /* ======================================== ADD TOKEN TO AXIOS */
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }

    /* ======================================== REMOVE TOKEN FROM AXIOS */
    const errorInterceptor = async (e: any) => {
      const status = e.response?.status;
      const unauthenticatedStatus = [401, 403, 409];
      const isUnauthenticated = unauthenticatedStatus.includes(status);

      if (isGuardedRoute && isUnauthenticated) {
        setToken(null);
      }
    };

    const interceptor = api.interceptors.response.use(undefined, errorInterceptor);

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [isGuardedRoute, token, setToken]);

  /* ======================================== RETURN */
  return (
    <AuthTokenContext.Provider
      value={{
        addToken: (token) => {
          setToken(token);
          router.replace("/(tabs)");
        },
        removeToken: () => {
          setToken(null);
          router.replace("/(tabs)");
        },
        token,
        isLoading,
      }}
    >
      {children}
    </AuthTokenContext.Provider>
  );
};
