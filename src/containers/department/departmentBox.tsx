"use client";

import useUpdateDepartmentListStore from "@/states/updateDepartmentListStore";
import { ReactNode, useState } from "react";
import DepartmentLine from "./deparmentLine";

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

interface DepartmentBoxProps {
  allClicked: boolean;
  departments: Department[];
  parent_id: number;
  parent_name: string;
  children?: ReactNode;
}

export default function DepartmentBox({
  allClicked,
  departments,
  parent_id,
  parent_name,
  children,
}: DepartmentBoxProps) {
  const { updateList, addUpdateList } = useUpdateDepartmentListStore();
  const [all, setAll] = useState(allClicked);

  const clickAllHandler = (status: boolean) => {
    console.log("전체 선택 클릭", status);

    setAll((prev) => !prev);
    departments.forEach((department) => {
      addUpdateList(department.department_id, status);
      department.status = status ? "ACTIVE" : "INACTIVE";
    });
  };

  const clickHandler = (id: number, status: boolean) => () => {
    addUpdateList(id, status);
    console.log(updateList);
  };

  return (
    <div className="h-[59rem] w-[23.3rem]">
      <div className="flex justify-between">
        <p className="mb-[2rem] text-[2rem] font-[900]">{parent_name}</p>
        <button
          className="h-[3rem] w-[11rem] rounded-[3rem] bg-bg text-[1.2rem] font-[600] text-gray"
          onClick={() => {
            clickAllHandler(!all);
            clickHandler(parent_id, !all)();
          }}
        >
          {parent_name} 전체 선택하기
        </button>
      </div>
      <div className="border-l-2 border-L-gray pl-[2rem]">
        {departments.map((department, index) => (
          <DepartmentLine
            key={index}
            title={department.department.department_name}
            set={
              department.status === "ACTIVE" ||
              updateList.some(
                (item) =>
                  item.status &&
                  item.department_id ===
                    department.department.parent_department_id
              )
            }
            onClick={clickHandler(
              department.department_id,
              department.status === "ACTIVE" ? false : true
            )}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
