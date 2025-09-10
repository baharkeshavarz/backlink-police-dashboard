import { getProjects } from "@/services/projects";
import { ProjectFiltersList } from "@/services/projects/types";
import { useQuery } from "@tanstack/react-query";

export const GET_PROJECTS_LIST = "GET_PROJECTS_LIST";

type GetProjectsProps = {
  filters?: ProjectFiltersList;
};

const useGetProjects = ({ filters }: GetProjectsProps) => {
  const query = useQuery({
    queryKey: [GET_PROJECTS_LIST],
    queryFn: async () => {
      const { data } = await getProjects({
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

export default useGetProjects;
