import { axiosInstance } from "../../lib/axios";
import { ProjectsListService } from "./types";

const BASE_URL = "/admin/project-link";

export const getProjects: ProjectsListService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/list`, {
    params,
  });
};
