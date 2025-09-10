import { getOrders } from "@/services/order";
import { OrderFiltersList } from "@/services/order/types";
import { useQuery } from "@tanstack/react-query";

type GetOrdersProps = {
  filters?: OrderFiltersList;
};

const useGetOrders = ({ filters }: GetOrdersProps) => {
  const query = useQuery({
    queryKey: ["GET_USER_ORDERS_LIST", filters],
    queryFn: async () => {
      const { data } = await getOrders({
        params: {
          ...filters,
        },
      });

      return data;
    },
    gcTime: 0,
  });

  return query;
};

export default useGetOrders;
