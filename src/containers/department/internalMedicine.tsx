"use client";

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

export default function InternalMedicine({
  departments,
}: {
  departments: Department[];
}) {
  return (
    <div className="h-[59rem] w-[23.3rem]">
      <div className="flex justify-between">
        <p className="mb-[2rem] text-[2rem] font-[900]">내과</p>
        <button className="h-[3rem] w-[11rem] rounded-[3rem] bg-bg text-[1.2rem] font-[600] text-gray">
          내과 전체 선택하기
        </button>
      </div>
      <div className="border-l-2 border-L-gray pl-[2rem]">
        {departments.map((department, index) => (
          <DepartmentLine
            key={index}
            title={department.department.department_name}
            set={department.status === "ACTIVE"}
          />
        ))}
      </div>
    </div>
  );
}
