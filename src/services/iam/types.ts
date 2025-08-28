import { Basic, Response } from "../types/common";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthPayload {
  email: string;
  password: string;
  loginProvider?: string;
  deviceId?: string;
}

export interface ResetPasswordPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponsePayload {
  accessToken: string;
  refreshToken?: string;
  user: { id: string | number; name?: string; email?: string };
}

export interface SignInService {
  (args: { payload: AuthPayload }): Response<Basic<AuthResponsePayload>>;
}

export interface SignUpPayload {
  email: string;
  password: string;
  name: string;
}

export interface ForgetPasswordPayload {
  email: string;
}

export interface SignUpService {
  (args: { payload: SignUpPayload }): Response;
}

export interface ForgetPasswordService {
  (args: { payload: ForgetPasswordPayload }): Response;
}
