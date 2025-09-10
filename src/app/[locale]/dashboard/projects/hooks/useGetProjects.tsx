import { BaseFiltersList } from "@/services/common/types";
import { getProjects } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";

export const GET_PROJECTS_LIST = "GET_PROJECTS_LIST";

type GetProjectsProps = {
  filters?: Partial<BaseFiltersList>;
};

const useGetProjects = ({ filters }: GetProjectsProps) => {
  const query = useQuery({
    queryKey: [GET_PROJECTS_LIST, filters],
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
