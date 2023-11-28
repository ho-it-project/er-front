"use client";

import DropDownInput from "@/components/common/DropDownInput";
import Input from "@/components/common/Input";
import useUpdateStore from "@/states/employeeUpdateStore";
import useUserStore from "@/states/userStore";
import Image from "next/image";
import { useState } from "react";

interface ValueProps {
  value: string;
  code: string;
}

interface AddEmployModalProps {
  isOpen: boolean;
  closeModal: () => void;
  departments: ValueProps[];
}

const DUMMYROLE = [
  { value: "관리자", code: "ADMIN" },
  { value: "전문의", code: "SPECIALIST" },
  { value: "전공의", code: "RESIDENT" },
  { value: "간호사", code: "NURSE" },
  { value: "응급구조사", code: "RECEPTIONIST" },
];

export default function AddEmployModal({
  isOpen,
  closeModal,
  departments,
}: AddEmployModalProps) {
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { update } = useUpdateStore();
  const { accessToken } = useUserStore();

  const onClickClear = () => {
    setName("");
    setDepartment("");
    setSpecialization("");
    setId("");
    setPassword("");
    setRole("");
  };

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

  const onClickSubmit = async () => {
    const exist = await isExist();

    if (!isEmpty() && !exist) {
      const url = "/api/er/employees";
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          employees: [
            {
              employee_name: name,
              id_card: id,
              password: password,
              role: role,
              department_id: Number(department),
            },
          ],
        }),
      };

      fetch(url, options)
        .then((response) => response.json())
        .then(() => {
          update();
        });

      onClickClear();
      closeModal();
    }
  };

  const isExist = async () => {
    const url = "/api/er/employees/exists";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id_cards: [id],
      }),
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        const existsArray = data.result.exists;
        return !!existsArray.find(
          (item: { id_card: string }) => item.id_card == id
        );
      });
  };

  const isEmpty = () => {
    if (name == "") {
      alert("이름을 작성해주세요.");
      return true;
    }
    if (role == "") {
      alert("역할을 정해주세요.");
      return true;
    }
    if (department == "진료과를 정해주세요.") {
      alert("");
      return true;
    }
    if (specialization == "") {
      alert("전문분야를 작성해주세요.");
      return true;
    }
    if (id == "") {
      alert("ID를 작성해주세요.");
      return true;
    }
    if (password == "비밀번호를 작성해주세요") {
      alert("");
      return true;
    }

    return false;
  };

  return (
    <div className="fixed left-1/2 top-1/2 z-30 h-[50rem] w-[82rem] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-bg px-[2rem] py-[3rem] drop-shadow-lg">
      <span className="absolute -top-[5rem] left-0 flex h-[7rem] w-[26rem] items-center justify-between rounded-2xl bg-bg px-[2rem]">
        <p className="text-[1.8rem] font-[600] text-main">인력 추가하기</p>
        <Image
          className="cursor-pointer"
          src="/fi-rr-cross-small.png"
          width={24}
          height={24}
          alt="닫기"
          onClick={closeModal}
        />
      </span>
      <button
        className="absolute right-[3rem] top-[2rem] h-[5.4rem] w-[20rem] rounded-2xl bg-main text-[1.6rem] font-[600] text-white"
        onClick={() => {
          onClickSubmit();
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
              type="role"
            />
          </div>
          <div className="flex w-[33.5rem] items-center justify-between">
            <span>진료과</span>
            <DropDownInput
              onChange={(value) => ChangeDepartmentHandler(value)}
              values={departments}
              value={department}
              type="department"
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
