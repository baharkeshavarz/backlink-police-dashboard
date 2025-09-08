import { Response } from "../types/common";

export interface ILocation {
  title: string;
  parentTitle: string;
  parentId: number;
  id: number;
  createDate: string;
  latestEditDate: string | null;
}

export interface GetLocationsService {
  (): Response<ILocation[]>;
}
