import { axiosInstance } from "../../lib/axios";
import { GetLocationsService } from "./types";

const BASE_URL = "/Location";

export const getCountries: GetLocationsService = () => {
  return axiosInstance.get(`${BASE_URL}/list`, { params: { parentId: "" } });
};
