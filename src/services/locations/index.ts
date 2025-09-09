import { axiosInstance } from "../../lib/axios";
import { GetLocationsService } from "./types";

const BASE_URL = "/Location";

// export const getCountries: GetLocationsService = () => {
//   return axiosInstance.get(
//     `${BASE_URL}/list?OnlyRoots=true&StartPage=1&EndPage=2`
//   );
// };

export const getCountries: GetLocationsService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/list`, { params });
};
