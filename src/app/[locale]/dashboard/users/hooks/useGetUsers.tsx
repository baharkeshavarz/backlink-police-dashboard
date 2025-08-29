import { getUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["GET_USERS_LIST"],
    queryFn: async () => {
      const { data } = await getUsers({ params: {} });
      return data;
    },
    gcTime: 0,
  });

  return query;
};

export default useGetUsers;
