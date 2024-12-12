import Axios, { InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";

import { useNotification } from "@/components/ui/notification";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  config.headers["Content-Type"] = "application/json";
  return config;
}

export const api = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const data = error.response?.data || {};
    const errors = data.errors;
    const message = data.message;

    const messages = Array.isArray(errors) && errors.length > 0 ? errors : message || error.message;

    useNotification.getState().setNotification({
      type: "error",
      messages,
    });

    if (error.response?.status === 401) {
      const path = window.location.pathname;
      if (!path.includes("login") && !path.includes("register")) {
        router.replace("/login");
      }
    }

    return Promise.reject(error);
  },
);
