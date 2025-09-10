import { getLocation } from "@/services/locations";
import { useQuery } from "@tanstack/react-query";

type GetLocationDetailsProps = {
  locationId: number;
};

export const GET_LOCATION_DETAILS = "GET_LOCATION_DETAILS";

const useGetLocationDetails = ({ locationId }: GetLocationDetailsProps) => {
  const query = useQuery({
    enabled: !!locationId,
    queryKey: [GET_LOCATION_DETAILS, locationId],
    queryFn: async () => {
      const { data } = await getLocation({ id: locationId });

      return data;
    },
    gcTime: 0,
  });

  return query;
};

export default useGetLocationDetails;
