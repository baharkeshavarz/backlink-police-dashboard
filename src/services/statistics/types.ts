import { Response } from "../types/common";

export interface IAdminStatisticsKPI {
  activeWeeklyUsersCount: number;
  activeWeeklyIncome: number;
  totalDailyBacklinks: number;
  totalBrokenBacklinks: number;
}

export interface AdminStatisticsService {
  (): Response<IAdminStatisticsKPI>;
}
