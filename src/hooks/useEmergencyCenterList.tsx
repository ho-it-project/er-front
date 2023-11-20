import {
  EmergencyCenter,
  useEmergencyCenterListStore,
} from "@/states/emergencyStore";
import { useEffect } from "react";
import useSWR from "swr";
import { useGeoLocation } from "./useGeoLocation";

interface GetEmergencyCenterListResponse {
  result: {
    emergency_center_list: EmergencyCenter[];
    count: number;
  };
  is_success: boolean;
  message: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());
export const useEmergencyCenterList = () => {
  const location = useGeoLocation();
  const { emergencyCenters, query, setPageLimit, setEmergencyCenters } =
    useEmergencyCenterListStore();
  const latitude = location?.[0].toString();
  const longitude = location?.[1].toString();

  const hasValidLocation = latitude && longitude;

  const queryParam = new URLSearchParams();

  if (hasValidLocation) {
    queryParam.append("latitude", latitude);
    queryParam.append("longitude", longitude);
  }

  queryParam.append("page", query.page.toString());
  queryParam.append("limit", query.limit.toString());
  queryParam.append("search", query.search || "");
  query.emergency_center_type.forEach((type) =>
    queryParam.append("emergency_center_type", type)
  );

  const { data, error, isLoading } = useSWR<GetEmergencyCenterListResponse>(
    hasValidLocation
      ? `/api/er/emergency-centers?${queryParam.toString()}`
      : null,
    hasValidLocation ? fetcher : null
  );

  useEffect(() => {
    if (data) {
      const { emergency_center_list, count } = data.result;

      setEmergencyCenters((prev) => {
        const uniqueEmployees = [...prev, ...emergency_center_list].reduce(
          (acc, current) =>
            acc.find(
              (item) => item.emergency_center_id === current.emergency_center_id
            )
              ? acc
              : [...acc, current],
          [] as EmergencyCenter[]
        );

        return uniqueEmployees;
      });
      setPageLimit({
        total_count: count,
        total_page: Math.ceil(count / query.limit),
      });
    }
  }, [data, setEmergencyCenters, setPageLimit, query.limit, query.page]);

  return { isLoading, emergencyCenters, error };
};
