import { getProjects } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";

const useGetProjects = () => {
  const query = useQuery({
    queryKey: ["GET_PROJECTS_LIST"],
    queryFn: async () => {
      const { data } = await getProjects({ params: {} });
      return data;
      //  return fakeData;
    },
    gcTime: 0,
  });

  return query;
};

export default useGetProjects;
