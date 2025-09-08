import { Basic, Response } from "../types/common";

export interface SignInPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
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
  passwordConfirm: string;
  terms: boolean;
  token: string;
}

export interface AuthResponsePayload {
  accessToken: string;
  refreshToken?: string;
  accessTokenExpires: string;
  refreshTokenExpires: string;
  scheme: string;
  tokenType: string;
  // user: { id: string | number; name?: string; email?: string };
}
export interface SignInService {
  (args: { payload: AuthPayload }): Response<AuthResponsePayload>;
}

export interface SignUpPayload {
  email: string;
  password: string;
  name: string;
}

export interface ForgetPasswordPayload {
  email: string;
}
export interface ForgetPasswordService {
  (args: { payload: ForgetPasswordPayload }): Response;
}

export interface ResetPasswordService {
  (args: { payload: Omit<ResetPasswordPayload, "email"> }): Response<Basic>;
}
