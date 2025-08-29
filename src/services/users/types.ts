import { Response } from "../types/common";

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

export interface UsersListService {
  (args: { params: Partial<IUser> }): Response;
}
