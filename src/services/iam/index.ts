import { axiosInstance } from "../../lib/axios";
import { ForgetPasswordService, SignInService } from "./types";

const BASE_URL = "/auth";

export const LoginIn: SignInService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/login`, payload);
};

export const forgetPassword: ForgetPasswordService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/forgot-password`, payload);
};
