import { axiosInstance } from "../../lib/axios";
import { AdminStatisticsService } from "./types";

const BASE_URL = "/AdminStatistics";

export const getAdminStatistic: AdminStatisticsService = () => {
  return axiosInstance.get(`${BASE_URL}/kpi`);
};
