import { Response } from "../types/common";

export interface IOrdersStatus {
  value: number;
  name: string;
  description: string;
}

export interface IOrder {
  userLastName: string;
  userFirstName: string;
  userId: string;
  projectId: number;
  projectName: string;
  projectImageUrl: string;
  projectWebsiteUrl: string;
  subscriptionPlanName: string;
  subscriptionPlanPrice: number;
  subscriptionPlanId: number;
  payedPrice: number;
  startDate: string;
  endDate: string;
  isPayed: true;
  status: IOrdersStatus;
  autoRenew: boolean;
  id: string;
  createDate: string;
  latestEditDate: string;
}

export interface IGetOrders {
  items: IOrder[];
}

export interface OrderFiltersList {
  baseSortEntityType?: number;
  sortType?: number;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageCount?: number;
  userId?: string;
}

export interface OrdersListService {
  (args: { params: Partial<OrderFiltersList> }): Response<IGetOrders>;
}
