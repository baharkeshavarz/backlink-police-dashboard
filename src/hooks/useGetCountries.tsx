import { Option } from "@/components/Fields";
import { getCountries } from "@/services/locations";
import { useQuery } from "@tanstack/react-query";

const useGetCountries = () => {
  const query = useQuery({
    queryKey: ["GET_COUNTRIES_LIST"],
    queryFn: async () => {
      const { data } = await getCountries();
      return data?.map((item) => {
        return {
          id: item.id,
          label: item.title,
          value: item.id,
        } as Option;
      });
    },
    gcTime: 0,
  });

  return query;
};

export default useGetCountries;
