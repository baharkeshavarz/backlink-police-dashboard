import { getAdminStatistic } from "@/services/statistics";
import { useQuery } from "@tanstack/react-query";

const useAdminStatistics = () => {
  const query = useQuery({
    queryKey: ["GET_ADMIN_STATISTICS"],
    queryFn: async () => {
      const { data } = await getAdminStatistic();
      return data;
    },
    gcTime: 0,
  });

  return query;
};

export default useAdminStatistics;
