import { Request, useRequestListStore } from "@/states/requestStore";
import { useEffect } from "react";
import useSWR from "swr";

interface GetRequestListResponse {
  result: {
    request_list: Request[];
    count: number;
  };
  is_success: boolean;
  message: string;
}

export const useRequestList = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { requests, query, setPageLimit, setRequests } = useRequestListStore();

  const queryParam = new URLSearchParams();

  queryParam.append("page", query.page.toString());
  queryParam.append("limit", query.limit.toString());
  queryParam.append("search", query.search || "");

  const { data, isLoading, error } = useSWR<GetRequestListResponse>(
    `/api/requests/ems-to-er/er?${queryParam.toString()}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log(data.result);

      const { count, request_list } = data.result;

      setRequests((prev) => {
        const uniqueRequests = [...prev, ...request_list].reduce(
          (acc, current) =>
            acc.find((item) => item.patient_id === current.patient_id)
              ? acc
              : [...acc, current],
          [] as Request[]
        );

        return uniqueRequests;
      });
      setPageLimit({
        total_count: count,
        total_page: Math.ceil(count / query.limit),
      });
    }
  }, [data, setRequests, setPageLimit, query.limit, query.page]);

  return { isLoading, requests, error };
};
