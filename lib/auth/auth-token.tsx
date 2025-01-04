import React, { type PropsWithChildren, createContext, useContext, useEffect } from "react";

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

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthTokenContext.Provider
      value={{
        addToken: (token) => {
          // Perform sign-in logic here
          setToken(token);
        },
        removeToken: () => {
          setToken(null);
        },
        token,
        isLoading,
      }}
    >
      {children}
    </AuthTokenContext.Provider>
  );
};
