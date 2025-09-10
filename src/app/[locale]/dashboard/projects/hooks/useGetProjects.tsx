import { getProjects } from "@/services/projects";
import { ProjectFiltersList } from "@/services/projects/types";
import { useQuery } from "@tanstack/react-query";

export const GET_PROJECTS_LIST = "GET_PROJECTS_LIST";

type GetProjectsProps = {
  filters?: Partial<ProjectFiltersList>;
};

const useGetProjects = ({ filters }: GetProjectsProps) => {
  const query = useQuery({
    queryKey: [GET_PROJECTS_LIST, filters],
    queryFn: async () => {
      console.log(filters);

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
