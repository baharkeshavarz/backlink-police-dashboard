import { Option } from "@/components/Fields";
import { getCountries } from "@/services/locations";
import { useQuery } from "@tanstack/react-query";

const useGetCountries = () => {
  const query = useQuery({
    queryKey: ["GET_ALL_COUNTRIES_LIST"],
    queryFn: async () => {
      const { data } = await getCountries({
        params: {
          OnlyRoots: Boolean(true),
          StartPage: 1,
          EndPage: 2,
        },
      });

      return data?.items?.map((item) => {
        return {
          id: item.id,
          label: item.title,
          value: item.id,
        } as Option;
      });
    },
    gcTime: 0,
    staleTime: 0,
  });

  return query;
};

export default useGetCountries;
