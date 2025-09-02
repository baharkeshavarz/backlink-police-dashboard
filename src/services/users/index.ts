import { axiosInstance } from "../../lib/axios";
import { AddInviteUserService, UsersListService } from "./types";

const BASE_URL = "/admin/user";

export const getUsers: UsersListService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/list`, {
    params,
  });
};

export const addUserInvite: AddInviteUserService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/invite`, payload);
};
