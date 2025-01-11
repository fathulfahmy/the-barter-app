import Axios, { InternalAxiosRequestConfig } from "axios";

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
  /* ======================================== SUCCESS RESPONSE INTERCEPTOR */
  (response) => {
    return response.data;
  },
  /* ======================================== ERROR RESPONSE INTERCEPTOR */
  (e) => {
    /* ======================================== UNNOTIFIABLE ERROR */
    const status = e.response?.status;
    const unnotifiableStatus = [401];
    const isUnnotifiable = unnotifiableStatus.includes(status);

    if (isUnnotifiable) {
      return Promise.reject(e);
    }

    /* ======================================== NOTIFIABLE ERROR */
    const data = e.response?.data ?? {};
    const errors = data.errors ?? [];
    const message = data.message ?? e.message;
    const isValidErrors = Array.isArray(errors) && errors.length > 0;

    let messages = "";

    if (status === 422) {
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
