"use client";

import Switch from "@/components/Switch";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import EditEmployModal from "./editEmployModal";

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
  const { isOpen, openModal, closeModal } = useModal();
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="flex h-[8.5rem] w-full items-center justify-between border-b-2 border-L-gray px-[4rem] text-[1.8rem] font-[700]">
      <span className="w-1/4 min-w-[15rem]">{name}</span>
      <span className="w-1/4 min-w-[15rem]">{role}</span>
      <span className="w-1/4 min-w-[15rem] overflow-hidden">{department}</span>
      <span className="w-1/4 min-w-[15rem]">{specialty}</span>
      <span className="flex min-w-[29rem]">
        <Switch
          clickedToggle={clickedToggle}
          toggle={toggle}
          colorType="yellow"
        />
        <button
          className="ml-[8.5rem] h-[3rem] w-[5.5rem] rounded-full bg-bg text-[1.5rem] text-L-gray"
          onClick={openModal}
        >
          수정
        </button>
        <span className="ml-[2rem] h-[3rem] w-[3rem] rounded-full bg-bg"></span>
      </span>
      <EditEmployModal
        isOpen={isOpen}
        closeModal={closeModal}
        set_name={name}
        set_role={role}
        set_department={department}
        set_specialty={specialty}
      />
      {isOpen && (
        <span className="fixed left-0 top-0 z-20 h-screen w-screen"></span>
      )}
    </div>
  );
}
