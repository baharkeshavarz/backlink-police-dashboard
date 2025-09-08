import { getProjects } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";

export const GET_PROJECTS_LIST = "GET_PROJECTS_LIST";

const useGetProjects = () => {
  const query = useQuery({
    queryKey: [GET_PROJECTS_LIST],
    queryFn: async () => {
      const { data } = await getProjects({ params: {} });
      return data;
    },
    gcTime: 0,
  });

  return query;
};

export default useGetProjects;
