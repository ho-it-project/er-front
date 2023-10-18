import DropDownInput from "@/components/common/DropDownInput";
import Input from "@/components/common/Input";
import { useState } from "react";

interface AddEmployModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DUMMYROLE = [
  { value: "전문의" },
  { value: "간호사" },
  { value: "응급구조사" },
];

const DUMMYDEPARTMENT = [
  { value: "호흡기내과" },
  { value: "순환기내과" },
  { value: "소화기내과" },
  { value: "혈액종양내과" },
  { value: "내분비대사내과" },
  { value: "알레르기내과" },
  { value: "신장내과" },
  { value: "류마티스내과" },
  { value: "내과(일반)" },
];

export default function AddEmployModal({
  isOpen,
  closeModal,
}: AddEmployModalProps) {
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
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
          인력 추가하기
        </div>
      </div>
      <button
        className="absolute right-[3rem] top-[2rem] h-[5.4rem] w-[20rem] rounded-2xl bg-main text-[1.6rem] font-[600] text-white"
        onClick={() => {
          closeModal();
          console.log(name, role, department, specialization, id, password);
        }}
      >
        저장히기
      </button>
      <div className="flex h-full flex-col justify-between px-[6rem] py-[5rem] text-[1.8rem] font-bold text-main">
        <div className="flex w-[28.5rem] items-center justify-between">
          <span>이름</span>
          <Input onChange={(value) => ChangeNameHandler(value)} title="이름" />
        </div>
        <div className="flex justify-between">
          <div className="flex w-[28.5rem] items-center justify-between">
            <span>역할</span>
            <DropDownInput
              onChange={(value) => ChangeRoleHandler(value)}
              values={DUMMYROLE}
            />
          </div>
          <div className="flex w-[28.5rem] items-center justify-between">
            <span>진료과</span>
            <DropDownInput
              onChange={(value) => ChangeDepartmentHandler(value)}
              values={DUMMYDEPARTMENT}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span>전문분야</span>
          <Input
            size="lg"
            onChange={(value) => ChangeSpecialHandler(value)}
            title="전문분야"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>ID</span>
          <Input
            size="lg"
            onChange={(value) => ChangeIdHandler(value)}
            title="ID"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>비밀번호</span>
          <Input
            size="lg"
            onChange={(value) => ChangePasswordHandler(value)}
            title="비밀번호"
          />
        </div>
      </div>
    </div>
  );
}
