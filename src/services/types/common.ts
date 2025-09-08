import { AxiosResponse } from "axios";

export type Response<T = unknown> = Promise<AxiosResponse<T>>;

export interface Basic<T = unknown> {
  data?: T | null;
  error?: string | null;
  success?: boolean;
}
