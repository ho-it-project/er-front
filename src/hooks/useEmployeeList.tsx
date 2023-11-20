import { Employee, useEmployeeListStore } from "@/states/employeeStore";
import { useEffect } from "react";
import useSWR from "swr";

interface GetEmployeeListResponse {
  result: {
    count: number;
    employee_list: Employee[];
  };
  is_success: boolean;
  message: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());
export const useEmoployeeList = () => {
  const { employees, query, setPageLimit, setEmployees } =
    useEmployeeListStore();

  const queryParam = new URLSearchParams();

  queryParam.append("page", query.page.toString());
  queryParam.append("limit", query.limit.toString());
  query.role.forEach((role) => queryParam.append("role", role));

  const { data, error, isLoading } = useSWR<GetEmployeeListResponse>(
    `/api/er/employees?${queryParam.toString()}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const { employee_list, count } = data.result;

      setEmployees((prev) => {
        const uniqueEmployees = [...prev, ...employee_list].reduce(
          (acc, current) =>
            acc.find((item) => item.employee_id === current.employee_id)
              ? acc
              : [...acc, current],
          [] as Employee[]
        );

        return uniqueEmployees;
      });
      setPageLimit({
        total_count: count,
        total_page: Math.ceil(count / query.limit),
      });
    }
  }, [data, setEmployees, setPageLimit, query.limit, query.page]);

  return { isLoading, employees, error };
};
