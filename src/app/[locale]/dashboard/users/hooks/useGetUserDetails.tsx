import { getUser } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

type GetUserDetailsProps = {
  userId: string;
};

export const GET_USER_DETAILS = "GET_USER_DETAILS";

const useGetUserDetails = ({ userId }: GetUserDetailsProps) => {
  const query = useQuery({
    enabled: !!userId,
    queryKey: [GET_USER_DETAILS, userId],
    queryFn: async () => {
      const { data } = await getUser({ id: userId });

      return data;
    },
    gcTime: 0,
  });

  return query;
};

export default useGetUserDetails;
