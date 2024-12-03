import { type PropsWithChildren, createContext, useContext, useEffect } from "react";

import { useStorageState } from "@/hooks/use-storage-state";

import { api } from "../axios";

type Token = string | null;

const TokenContext = createContext<{
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

// This hook can be used to access the user info.
export function useToken() {
  const value = useContext(TokenContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useToken must be wrapped in a <TokenProvider />");
    }
  }

  return value;
}

export function TokenProvider({ children }: PropsWithChildren) {
  const [[isLoading, token], setToken] = useStorageState("token");

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <TokenContext.Provider
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
    </TokenContext.Provider>
  );
}
