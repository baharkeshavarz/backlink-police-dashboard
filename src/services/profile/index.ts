import { axiosInstance } from "../../lib/axios";
import { UpdateProfileAvatarService } from "./types";

const BASE_URL = "/me/profile";

export const updateUserProfileAvatar: UpdateProfileAvatarService = ({
  payload,
}) => {
  return axiosInstance.put(`${BASE_URL}/UpdateAvatar`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUserProfileAvatar = () => {
  return axiosInstance.delete(`${BASE_URL}/DeleteAvatar`);
};
