import { axiosInstance } from "../../lib/axios";
import {
  ProjectsListService,
  AddProjectLinkService,
  UpdateProjectLinkService,
  GetProjectLinkService,
  RescanProjectLinkService,
} from "./types";

const BASE_URL = "/admin/project-link";

export const getProjects: ProjectsListService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/list`, {
    params,
  });
};

export const addProjectLink: AddProjectLinkService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}`, payload);
};

export const getProjectLink: GetProjectLinkService = ({ id }) => {
  return axiosInstance.get(`${BASE_URL}/${id}`);
};

export const updateProjectLink: UpdateProjectLinkService = ({ payload }) => {
  return axiosInstance.put(`${BASE_URL}`, payload);
};

export const rescanProjectLink: RescanProjectLinkService = ({
  projectLinkId,
}) => {
  return axiosInstance.post(`${BASE_URL}/${projectLinkId}/rescan`);
};
