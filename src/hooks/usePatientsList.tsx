import { PatientSummary, usePatientListStore } from "@/states/patientsStore";
import useUserStore from "@/states/userStore";
import { useEffect } from "react";
import useSWR from "swr";

interface GetPatientListResponse {
  result: {
    count: number;
    patient_list: PatientSummary[];
  };
  is_success: boolean;
  message: string;
}

const fetcher = (url: string, accessToken: string) =>
  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());

export const usePatientList = () => {
  const { patients, query, setPageLimit, setPatients } = usePatientListStore();

  const queryParam = new URLSearchParams();

  queryParam.append("page", query.page.toString());
  queryParam.append("limit", query.limit.toString());
  query.patient_status.forEach((status) =>
    queryParam.append("patient_status", status)
  );

  const { accessToken } = useUserStore();
  const { data, error, isLoading, mutate } = useSWR<GetPatientListResponse>(
    `/api/er/patients?${queryParam.toString()}`,
    (url: string) => fetcher(url, accessToken)
  );

  useEffect(() => {
    if (data) {
      mutate();
      if (!data.is_success) return;

      const { patient_list, count } = data.result;

      setPatients((prev) => {
        const uniquePatients = patient_list.reduce(
          (acc, current) =>
            acc.find((item) => item.patient_id === current.patient_id)
              ? acc
              : [...acc, current],
          prev
        );

        return uniquePatients;
      });
      setPageLimit({
        total_count: count,
        total_page: Math.ceil(count / query.limit),
      });
    }
  }, [
    data,
    setPatients,
    setPageLimit,
    query.limit,
    query.page,
    query.patient_status,
    mutate,
  ]);

  return { isLoading, patients, error };
};
