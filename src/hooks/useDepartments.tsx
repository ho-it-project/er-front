import useUserStore from "@/states/userStore";
import useSWR from "swr";

const fetcher = (url: string, accessToken: string) =>
  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((r) => r.json());

type Response<T> = {
  result: T;
  is_success: boolean;
};

interface prop {
  doctor_specializations: object[];
  department_id: number;
  department_name: string;
  parent_department_id: number;
  created_at: string;
  updated_at: string;
  status: string;
}

export default function useDepartments() {
  const { accessToken } = useUserStore();
  const { data, error, isLoading } = useSWR<Response<prop[]>>(
    "/api/er/departments",
    (url: string) => fetcher(url, accessToken)
  );

  return { data: data?.result, error, isLoading };
}
