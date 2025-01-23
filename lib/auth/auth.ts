import { z } from "zod";

import { AuthResponse, User } from "@/types/api";

import { api } from "../axios";
import { zodPassword } from "../zod";
import { configureAuth } from "./react-query-auth";

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

/* ======================================== AXIOS */
/* ======================================== AUTH USER */
const getUser = async (): Promise<User> => {
  const response = await api.get("/auth/me");

  return response.data;
};

/* ======================================== LOGOUT */
const logout = (): Promise<void> => {
  return api.post("/auth/logout");
};

/* ======================================== LOGIN */
export const loginInputSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput) => {
  return api.post("/auth/login", data);
};

/* ======================================== REGISTER */
export const registerInputSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
    password: zodPassword(),
    password_confirmation: z.string().min(1, "Password confirmation is required"),
    bank_name: z.string().min(1, "Bank name is required"),
    bank_account_number: z.string().min(1, "Bank account number is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (data: RegisterInput) => {
  return api.post("/auth/register", data);
};

/* ======================================== REACT-QUERY-AUTH */
const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await loginWithEmailAndPassword(data);
    return response.data;
  },
  registerFn: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await registerWithEmailAndPassword(data);
    return response.data;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister } = configureAuth(authConfig);
