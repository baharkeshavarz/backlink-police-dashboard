import { Response } from "../types/common";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInService {
  (args: { payload: SignInPayload }): Response;
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
