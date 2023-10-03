"use client";

import Switch from "@/components/Switch";
import { useState } from "react";

interface EmployeeListItemProps {
  name: string;
  role: string;
  department: string;
  specialty: string;
  toggleStatus: boolean;
}

export default function EmployeeListItem({
  name,
  role,
  department,
  specialty,
  toggleStatus,
}: EmployeeListItemProps) {
  const [toggle, setToggle] = useState(toggleStatus);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="flex h-[8.5rem] w-full min-w-[129rem] items-center justify-between border-b-2 border-L-gray px-[4rem] text-[1.8rem] font-[700]">
      <span className="w-[25rem]">{name}</span>
      <span className="w-[25rem]">{role}</span>
      <span className="w-[25rem]">{department}</span>
      <span className="w-[25rem]">{specialty}</span>
      <span className="flex min-w-[29rem]">
        <Switch
          clickedToggle={clickedToggle}
          toggle={toggle}
          colorType="yellow"
        />
        <button className="ml-[8.5rem] h-[3rem] w-[5.5rem] rounded-full bg-bg text-[1.5rem] text-L-gray">
          수정
        </button>
        <span className="ml-[2rem] h-[3rem] w-[3rem] rounded-full bg-bg"></span>
      </span>
    </div>
  );
}
