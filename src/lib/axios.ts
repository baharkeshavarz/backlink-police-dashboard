import { PUBLIC_GATEWAY_URL } from "@/config/app";
import axios from "axios";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export const config = {
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}${PUBLIC_GATEWAY_URL}`,
  timeout: 3000 * 10,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_URL,
  },
};

export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  (config) => {
    const lang = "en-EN"; // TODO: get language from user settings or browser
    if (lang) {
      config.headers["Accept-Language"] = lang;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (next) => {
    const message = next.data?.message;
    if (message) {
      toast.success(message);
    }
    return Promise.resolve(next);
  },
  async (error) => {
    const expectedErrors =
      error.response.status >= 400 && error.response.status < 500;

    const status = error?.response?.status;
    if (status === 403) {
    } else if (status === 401) {
      try {
        throw Error("Not supported refresh token at now!");
      } catch {
        const message = "Authentication Failed. Please login again";
        toast.error(message, {
          id: message,
        });
        await signOut();
      }
    } else if (expectedErrors) {
      const detail = error?.response?.data;
      if (detail) {
        toast.error(detail, {
          id: detail,
        });
      }
    } else if (error?.response?.status === 500) {
      throw new Error("Internal Server Error");
    }

    return Promise.reject(error);
  }
);
