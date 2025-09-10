import { axiosInstance } from "../../lib/axios";
import { GetLocationService, GetLocationsService } from "./types";

const BASE_URL = "/Location";

export const getCountries: GetLocationsService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/list`, { params });
};

export const getLocation: GetLocationService = ({ id }) => {
  return axiosInstance.get(`${BASE_URL}/${id}`);
};
