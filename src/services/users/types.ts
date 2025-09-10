import { Response } from "../types/common";

export interface IAuthenticatedUser {
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface IUser {
  id: string;
  createDate: string;
  latestEditDate: string;
  firstName: string;
  lastName: string;
  prefix?: string;
  isSuperAdmin: boolean;
  externalProfileImageUrl?: string;
  phoneNumber?: string;
  imageUrl?: string;
  countryId: number;
  email: string;
  address?: string;
  birthDate?: string;
  organization?: string;
  department?: string;
  zip?: string;
  roleIds: number[];
  role?: string;
  isOnboarded: boolean;
  stateId?: number;
  city?: string;
  isActive: boolean;
  lastSession?: string;
  isAdmin: boolean;
}

export interface IUserInvitePayload {
  name: string;
  email: string;
}

export enum UserStatusEnum {
  Online = 1,
  Offline = 0,
}
export interface IGetUsers {
  items: IUser[];
}

export interface IEditUserPayload {
  firstName: string;
  lastName: string;
  countryId: number;
  city: string;
  address: string;
  email: string;
  phoneNumber: string;
  birthDate?: unknown;
  organization: string;
  role: string;
  department: string;
  zip: string;
}

export interface IDeactivateUserPayload {
  userId?: string;
  reason: string;
  description: string;
}

export interface IDeletePayload {
  id: string;
}

export interface UsersListService {
  (args: { params: Partial<IUser> }): Response<IGetUsers>;
}

export interface AddInviteUserService {
  (args: { payload: IUserInvitePayload }): Response;
}

export interface GetUsertService {
  (args: { id: number | string }): Response<IUser>;
}

export interface UpdateUserService {
  (args: { params: Partial<IEditUserPayload> }): Response;
}

export interface DeActivateUserService {
  (args: { params: IDeactivateUserPayload }): Response;
}

export interface DeleteUserService {
  (args: { params: IDeletePayload }): Response;
}
