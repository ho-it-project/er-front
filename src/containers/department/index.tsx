"use client";

import Spinner from "@/components/Spinner";
import useUpdateDepartmentListStore from "@/states/updateDepartmentListStore";
import useUserStore from "@/states/userSore";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DepartmentLine from "./deparmentLine";
import DepartmentBox from "./departmentBox";

interface DepartmentInfo {
  department_id: number;
  department_name: string;
  parent_department_id: number;
}

interface Department {
  department: DepartmentInfo;
  department_id: number;
  status: string;
}

export default function DepartmentSettingContainer() {
  const { userData } = useUserStore();
  const url = `/api/er/${userData.emergency_center_id}/departments`;
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, isLoading } = useSWR(url, fetcher);

  const [internal, setInternal] = useState<Department[]>([]);
  const [surgery, setSurgery] = useState<Department[]>([]);
  const [normal, setNormal] = useState<Department[]>([]);

  const [internalId, setInternalId] = useState(0);
  const [surgeryId, setSurgeryId] = useState(0);

  const { updateList, addUpdateList } = useUpdateDepartmentListStore();
  console.log(updateList);

  const clickHandler = (id: number, status: boolean) => () => {
    addUpdateList(id, status);
  };

  const deparmentUpdateSubmit = () => {
    console.log("updateList", updateList);

    const url = `/api/er/${userData.emergency_center_id}/departments`;
    const dataToUpdate = {
      update_department_list: updateList.map((item) => ({
        department_id: item.department_id,
        status: item.status ? "ACTIVE" : "INACTIVE",
      })),
    };
    console.log("dataToUpdate", dataToUpdate);

    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then((r) => r.json())
      .then((d) => console.log(d));
  };

  useEffect(() => {
    console.log(data);

    if (data && data.result) {
      const sortedResult = data.result.sort(
        (a: Department, b: Department) =>
          a.department.department_id - b.department.department_id
      );

      setInternalId(
        sortedResult.find(
          (part: Department) => part.department.department_name === "내과"
        )?.department.department_id || null
      );
      setSurgeryId(
        sortedResult.find(
          (part: Department) => part.department.department_name === "외과"
        )?.department.department_id || null
      );

      const internalDepartments: Department[] = sortedResult.filter(
        (department: Department) =>
          department.department.parent_department_id === 1
      );
      setInternal(internalDepartments);

      const surgeryDepartments = sortedResult.filter(
        (department: Department) =>
          department.department.parent_department_id === 13
      );
      setSurgery(surgeryDepartments);

      const normalDepartments = sortedResult.filter(
        (department: Department) =>
          department.department.parent_department_id === null &&
          department.department_id !== 1 &&
          department.department_id !== 13
      );
      setNormal(normalDepartments);
    }
  }, [data, useUserStore]);

  return (
    <>
      <div className="px-[8rem] py-[6rem]">
        <div className="flex justify-between">
          <p className="ml-[6rem] w-[24rem] text-[1.2rem] font-[600] text-gray">
            • 현재 진료 가능한 과를 선택해주세요.
          </p>
          <button
            className="h-[5rem] w-[20rem] rounded-[1rem] bg-main text-[1.6rem] font-[600] text-white"
            onClick={deparmentUpdateSubmit}
          >
            저장하기
          </button>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="mx-auto mt-[12rem] flex h-[60rem] w-[93rem] justify-between">
            <DepartmentBox
              departments={internal}
              parent_id={internalId}
              parent_name="내과"
            />
            <DepartmentBox
              departments={surgery}
              parent_id={surgeryId}
              parent_name="외과"
            >
              {normal.slice(0, 3).map((department, index) => (
                <DepartmentLine
                  key={index}
                  title={department.department.department_name}
                  set={department.status === "ACTIVE"}
                  onClick={clickHandler(
                    department.department_id,
                    department.status === "ACTIVE" ? false : true
                  )}
                />
              ))}
            </DepartmentBox>
            <div className="h-[59rem] w-[23.3rem]">
              {normal.slice(3).map((department, index) => (
                <DepartmentLine
                  key={index}
                  title={department.department.department_name}
                  set={department.status === "ACTIVE"}
                  onClick={clickHandler(
                    department.department_id,
                    department.status === "ACTIVE" ? false : true
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
