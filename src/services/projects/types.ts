import { Response } from "../types/common";

export interface IBacklinkProject {
  projectName: string;
  projectId: number;
  publisherUrl: string;
  cost: number;
  purchasedOn: string;
  lastScanDate: string;
  lastScan: {
    value: number;
    name: string;
    description: string;
  };
  lastAnchorKeyWord: string;
  lastFollowStatus: number;
  differentAnchorKeyWord: boolean;
  lastBacklinkUrl: string;
  differentBacklinkUrl: boolean;
  urlStatus: {
    value: number;
    name: string;
    description: string;
  };
  anchorKeyWord: string;
  backLinkUrl: string;
  followStatus: {
    value: number;
    name: string;
    description: string;
  };
  id: number;
  createDate: string;
  latestEditDate: string | null;
}

export interface IGetProjects {
  items: IBacklinkProject[];
}

export interface ProjectsListService {
  (args: { params: Partial<IBacklinkProject> }): Response<IGetProjects>;
}
