import { axiosInstance } from "../../lib/axios";
import { ProjectsListService, AddProjectLinkService } from "./types";

const BASE_URL = "/admin/project-link";

export const getProjects: ProjectsListService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/list`, {
    params,
  });
};

export const addProjectLink: AddProjectLinkService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}`, payload);
};
