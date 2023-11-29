import { Request, useRequestListStore } from "@/states/requestStore";
import useUserStore from "@/states/userStore";
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
  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((r) => r.json());

  const { requests, query, setPageLimit, setRequests } = useRequestListStore();

  const queryParam = new URLSearchParams();

  queryParam.append("page", query.page.toString());
  queryParam.append("limit", query.limit.toString());
  queryParam.append("search", query.search || "");
  query.request_status.forEach((status) =>
    queryParam.append("request_status", status)
  );

  const { accessToken } = useUserStore();

  const { data, isLoading, error, mutate } = useSWR<GetRequestListResponse>(
    `/api/requests/ems-to-er/er?${queryParam.toString()}`,
    (url: string) => fetcher(url, accessToken)
  );

  useEffect(() => {
    if (data) {
      const { result, is_success } = data;
      if (!is_success) return;
      const { request_list, count } = result;

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

  return { isLoading, requests, error, mutate };
};
