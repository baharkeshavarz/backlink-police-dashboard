import { axiosInstance } from "../../lib/axios";
import {
  AddInviteUserService,
  DeActivateUserService,
  DeleteUserService,
  GetUserService,
  UpdateUserAvatarService,
  UpdateUserService,
  UsersListService,
} from "./types";

const BASE_URL = "/admin/user";

export const getUsers: UsersListService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/list`, {
    params,
  });
};

export const addUserInvite: AddInviteUserService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/invite`, payload);
};

export const getUser: GetUserService = ({ id }) => {
  return axiosInstance.get(`${BASE_URL}/${id}`);
};

export const updateUser: UpdateUserService = ({ params }) => {
  return axiosInstance.put(`${BASE_URL}`, null, {
    params,
  });
};

export const deActivateUser: DeActivateUserService = ({ params }) => {
  return axiosInstance.post(`${BASE_URL}/DeActivate`, null, { params });
};

export const deleteUser: DeleteUserService = ({ params }) => {
  return axiosInstance.delete(`${BASE_URL}`, { params });
};

export const updateUserAvatar: UpdateUserAvatarService = ({
  payload,
  params,
}) => {
  return axiosInstance.put(`${BASE_URL}`, payload, {
    params,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
