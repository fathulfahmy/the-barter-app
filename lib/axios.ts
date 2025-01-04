import Axios, { InternalAxiosRequestConfig } from "axios";
import { router, usePathname } from "expo-router";

import { useNotification } from "@/components/ui/notification";

/* ======================================== CONFIG */
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  return config;
}

/* ======================================== SINGLETON */
export const api = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    /* ======================================== SUCCESS RESPONSE INTERCEPTOR */
    return response.data;
  },
  (e) => {
    /* ======================================== ERROR RESPONSE INTERCEPTOR */
    if (e.response?.status === 401) {
      const currentRoute = usePathname();
      const publicRoutes = ["/login", "/register"];
      const isPublicRoute = publicRoutes.includes(currentRoute);

      if (!isPublicRoute) {
        router.replace("/login");
      }
    }

    const data = e.response?.data ?? {};
    const errors = data.errors ?? [];
    const message = data.message ?? e.message;
    const isValidErrors = Array.isArray(errors) && errors.length > 0;

    let messages = "";

    if (e.response?.status === 422) {
      messages = isValidErrors ? errors : message;
    } else {
      messages = message;
    }

    useNotification.getState().setNotification({
      type: "error",
      messages,
    });

    return Promise.reject(e);
  },
);
