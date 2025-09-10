import { axiosInstance } from "../../lib/axios";
import { OrdersListService } from "./types";

const BASE_URL = "/admin/order";

export const getOrders: OrdersListService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/list`, {
    params,
  });
};
