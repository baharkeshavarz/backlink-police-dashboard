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

export interface IAddProjectLinkPayload {
  backLinkUrl: string;
  publisherUrl: string;
  cost: number;
  purchasedOn: string;
  projectId: number;
  setActivity: boolean;
  userId: string;
}
export interface IUpdateProjectLinkPayload {
  id: number;
  backLinkUrl: string;
  publisherUrl: string;
  cost: number;
  purchasedOn: string;
}

export interface ProjectsListService {
  (args: { params: Partial<IBacklinkProject> }): Response<IGetProjects>;
}

export interface AddProjectLinkService {
  (args: { payload: IAddProjectLinkPayload }): Response;
}

export interface GetProjectLinkService {
  (args: { id: number | string }): Response<IBacklinkProject>;
}

export interface UpdateProjectLinkService {
  (args: { payload: IUpdateProjectLinkPayload }): Response;
}
