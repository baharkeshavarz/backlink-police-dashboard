import { IBacklinkProject } from "../projects/types";
import { Response } from "../types/common";

export interface ILocation {
  title: string;
  parentTitle: string;
  parentId: number;
  id: number;
  createDate: string;
  latestEditDate: string | null;
}

export interface IGetLocations {
  items: ILocation[];
}

export interface IGetLocationFilter {
  OnlyRoots: boolean;
  StartPage: number;
  EndPage: number;
}

export interface GetLocationsService {
  (args: { params: IGetLocationFilter }): Response<IGetLocations>;
}
