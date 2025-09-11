import { BaseFiltersList } from "@/services/common/types";
import { getUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

type GetUsersProps = {
  filters?: Partial<BaseFiltersList>;
};

export const GET_USERS_LIST = "GET_USERS_LIST";

const useGetUsers = ({ filters }: GetUsersProps) => {
  const query = useQuery({
    queryKey: [GET_USERS_LIST, filters],
    queryFn: async () => {
      const { data } = await getUsers({
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

export default useGetUsers;
