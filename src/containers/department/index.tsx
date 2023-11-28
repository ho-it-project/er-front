"use client";

import Spinner from "@/components/Spinner";
import SaveAlert from "@/components/common/saveAlert";
import useSaveAlert from "@/hooks/useSaveAlert";
import useUpdateDepartmentListStore from "@/states/updateDepartmentListStore";
import useUserStore from "@/states/userStore";
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
  const { userData, accessToken } = useUserStore();
  const url = `/api/er/${userData.emergency_center_id}/departments`;
  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((r) => r.json());
  const { data, isLoading } = useSWR(url, (url) => fetcher(url, accessToken));

  const [internal, setInternal] = useState<Department[]>([]);
  const [surgery, setSurgery] = useState<Department[]>([]);
  const [normal, setNormal] = useState<Department[]>([]);

  const [internalId, setInternalId] = useState(0);
  const [surgeryId, setSurgeryId] = useState(0);

  const { updateList, addUpdateList } = useUpdateDepartmentListStore();
  const { isAlertVisible, showSuccessAlert } = useSaveAlert();

  const clickHandler = (id: number, status: boolean) => () => {
    addUpdateList(id, status);
  };

  const deparmentUpdateSubmit = () => {
    if (updateList.length === 0) return;

    const url = `/api/er/${userData.emergency_center_id}/departments`;
    const dataToUpdate = {
      update_department_list: updateList.map((item) => ({
        department_id: item.department_id,
        status: item.status ? "ACTIVE" : "INACTIVE",
      })),
    };

    fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then((r) => r.json())
      .then(() => showSuccessAlert());
  };

  useEffect(() => {
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
  }, [data]);

  return (
    <>
      {isAlertVisible && <SaveAlert />}
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
              allClicked={internal.some((i) => i.status === "INACTIVE")}
              departments={internal}
              parent_id={internalId}
              parent_name="내과"
            />
            <DepartmentBox
              allClicked={surgery.some((i) => i.status === "INACTIVE")}
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
