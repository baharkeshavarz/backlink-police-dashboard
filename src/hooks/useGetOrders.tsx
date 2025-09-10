import { getOrders } from "@/services/order";
import { OrderFiltersList } from "@/services/order/types";
import { useQuery } from "@tanstack/react-query";

type GetOrdersProps = {
  filter?: OrderFiltersList;
};

const useGetOrders = ({ filter }: GetOrdersProps) => {
  const query = useQuery({
    queryKey: ["GET_USER_ORDERS_LIST", filter],
    queryFn: async () => {
      const { data } = await getOrders({
        params: {
          ...filter,
        },
      });

      return data;
    },
    gcTime: 0,
  });

  return query;
};

export default useGetOrders;
