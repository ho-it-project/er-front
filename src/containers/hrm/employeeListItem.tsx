"use client";

import Switch from "@/components/Switch";
import useModal from "@/hooks/useModal";
import { Role, RoleType } from "@/type";
import EditEmployModal from "./editEmployModal";

interface ValueProps {
  value: string;
  code: string;
}

interface EmployeeListItemProps {
  name: string;
  role: Role;
  department_list: ValueProps[];
  department: string;
  specialty?: string[];
  toggleStatus: boolean;
}

export default function EmployeeListItem({
  name,
  role,
  department_list,
  department,
  specialty,
  toggleStatus,
}: EmployeeListItemProps) {
  const { isOpen, openModal, closeModal } = useModal();

  const roleType: RoleType = {
    ADMIN: "관리자",
    SPECIALIST: "전문의",
    RESIDENT: "전공의",
    NURSE: "간호사",
    RECEPTIONIST: "응급구조사",
  };

  const specialization = specialty?.join(", ");
  const translateRole = roleType[role as keyof RoleType];
  const translateDepartment = department_list
    .filter((part: ValueProps) => part.code === String(department))
    .map((part: ValueProps) => part.value);

  return (
    <div className="flex h-[8.5rem] w-full items-center justify-between border-b-2 border-L-gray px-[4rem] text-[1.8rem] font-[700]">
      <span className="w-1/4 min-w-[15rem]">{name}</span>
      <span className="w-1/4 min-w-[15rem]">{translateRole}</span>
      <span className="w-1/4 min-w-[15rem] overflow-hidden">
        {translateDepartment}
      </span>
      <span className="w-1/4 min-w-[15rem]">{specialization}</span>
      <span className="flex min-w-[29rem]">
        <Switch set={toggleStatus} colorType="yellow" />
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
        set_specialty={specialization}
      />
      {isOpen && (
        <span className="fixed left-0 top-0 z-20 h-screen w-screen"></span>
      )}
    </div>
  );
}
