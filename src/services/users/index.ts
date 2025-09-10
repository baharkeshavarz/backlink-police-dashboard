import { axiosInstance } from "../../lib/axios";
import {
  AddInviteUserService,
  DeActivateUserService,
  GetUsertService,
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

export const getUser: GetUsertService = ({ id }) => {
  return axiosInstance.get(`${BASE_URL}/${id}`);
};

export const updateUser: UpdateUserService = ({ params }) => {
  return axiosInstance.put(`${BASE_URL}`, null, {
    params,
  });
};

export const deActivateUser: DeActivateUserService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/DeActivate`, payload);
};
