import { Response } from "../types/common";

export interface UpdateProfileAvatarService {
  (args: { payload: FormData }): Response;
}
