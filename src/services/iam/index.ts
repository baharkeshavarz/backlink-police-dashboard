import { axiosInstance } from "../../lib/axios";
import {
  ForgetPasswordService,
  ResetPasswordService,
  SignInService,
} from "./types";

const BASE_URL = "/auth";

export const LoginIn: SignInService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/login`, payload);
};

export const GetMeWithToken = (refreshedToken: string) => {
  return axiosInstance.get(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${refreshedToken}`,
    },
    timeout: 10000,
  });
};

export const forgetPassword: ForgetPasswordService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/reset-password/request`, payload);
};

export const resetPassword: ResetPasswordService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/reset-password`, payload);
};

export const AdminSignOut = () => {
  return axiosInstance.post(`${BASE_URL}/sing-out`);
};
