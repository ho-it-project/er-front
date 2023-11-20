"use client";

import DropDownInput from "@/components/common/DropDownInput";
import Input from "@/components/common/Input";
import { useState } from "react";

interface EditEmployModalProps {
  isOpen: boolean;
  closeModal: () => void;
  set_name: string;
  set_role: string;
  set_department: string;
  set_specialty?: string;
}

const DUMMYROLE = [
  { value: "전문의", code: "DOCTOR" },
  { value: "간호사", code: "NURSE" },
  { value: "응급구조사", code: "RECEPTIONIST" },
];

const DUMMYDEPARTMENT = [
  { value: "호흡기내과", code: "RESPIRATORY" },
  { value: "순환기내과", code: "CARDIOLOGY " },
  { value: "소화기내과", code: "GASTROENTERLOGY" },
  { value: "혈액종양내과", code: "HEMATOLOGY_ONCOLOGY" },
  { value: "내분비대사내과", code: "ENDOCRINOLOGY_METABOLISM" },
  { value: "알레르기내과", code: "ALLERGY" },
  { value: "신장내과", code: "NEPHROLOGY" },
  { value: "류마티스내과", code: "RHEUMATOLOGY" },
  { value: "내과(일반)", code: "INTERNAL" },
];

export default function EditEmployModal({
  isOpen,
  closeModal,
  set_name,
  set_role,
  set_department,
  set_specialty,
}: EditEmployModalProps) {
  const [role, setRole] = useState(set_role);
  const [department, setDepartment] = useState(set_department);
  const [name, setName] = useState(set_name);
  const [specialization, setSpecialization] = useState(set_specialty);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const ChangeDepartmentHandler = (value: string) => {
    setDepartment(value);
  };
  const ChangeRoleHandler = (value: string) => {
    setRole(value);
  };
  const ChangeNameHandler = (value: string) => {
    setName(value);
  };
  const ChangeSpecialHandler = (value: string) => {
    setSpecialization(value);
  };
  const ChangeIdHandler = (value: string) => {
    setId(value);
  };
  const ChangePasswordHandler = (value: string) => {
    setPassword(value);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed left-1/2 top-1/2 z-30 h-[50rem] w-[82rem] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-bg px-[2rem] py-[3rem] drop-shadow-lg">
      <div className="absolute -top-[5rem] left-0 flex h-[7rem] w-full min-w-[144rem] gap-[3rem]">
        <div className="w-[26rem] rounded-2xl bg-bg pl-[3rem] pt-[2rem] text-[1.8rem] font-[700] text-main">
          인력 수정하기
        </div>
      </div>
      <button
        className="absolute right-[3rem] top-[2rem] h-[5.4rem] w-[20rem] rounded-2xl bg-main text-[1.6rem] font-[600] text-white"
        onClick={() => {
          closeModal();
        }}
      >
        저장히기
      </button>
      <div className="flex h-full flex-col justify-between px-[6rem] py-[5rem] text-[1.8rem] font-bold text-main">
        <div className="flex w-[28.5rem] items-center justify-between">
          <span>이름</span>
          <Input
            onChange={(value) => ChangeNameHandler(value)}
            title="이름"
            value={name}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex w-[28.5rem] items-center justify-between">
            <span>역할</span>
            <DropDownInput
              onChange={(value) => ChangeRoleHandler(value)}
              values={DUMMYROLE}
              value={role}
            />
          </div>
          <div className="flex w-[28.5rem] items-center justify-between">
            <span>진료과</span>
            <DropDownInput
              onChange={(value) => ChangeDepartmentHandler(value)}
              values={DUMMYDEPARTMENT}
              value={department}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span>전문분야</span>
          <Input
            size="lg"
            onChange={(value) => ChangeSpecialHandler(value)}
            title="전문분야"
            value={specialization}
          />
        </div>
        <div className="flex items-center justify-between">
          <span>ID</span>
          <Input
            size="lg"
            onChange={(value) => ChangeIdHandler(value)}
            title="ID"
            value={id}
          />
        </div>
        <div className="flex items-center justify-between">
          <span>비밀번호</span>
          <Input
            size="lg"
            onChange={(value) => ChangePasswordHandler(value)}
            title="비밀번호"
            value={password}
          />
        </div>
      </div>
    </div>
  );
}
