"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SearchInput from "@/components/common/SearchInput";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import AddEmployModal from "./addEmployModal";
import EmployeeListHeader from "./employeeListHeader";
import EmployeeListItem from "./employeeListItem";
import Nav from "./nav";

const TopNavs = [{ title: "인력 관리", link: "/hrm" }];

const DUMMY = [
  {
    name: "최세종",
    role: "전문의",
    department: "응급의학과",
    specialty: "중환자의학",
    toggleStatus: true,
  },
  {
    name: "최세종",
    role: "간호사",
    department: "응급의학과",
    specialty: "비뇨정신질환, 유방암, 광배근전기치료",
    toggleStatus: false,
  },
  {
    name: "최세종",
    role: "응급구조사",
    department: "응급의학과",
    specialty: "중환자의학",
    toggleStatus: true,
  },
  {
    name: "최세종",
    role: "응급구조사",
    department: "응급의학과",
    specialty: "중환자의학",
    toggleStatus: true,
  },
];

export default function HRMContainer() {
  const { isOpen, openModal, closeModal } = useModal();

  const [, setSearchWord] = useState("");
  const [clickedNav, setClickedNav] = useState("전체");

  const ChangeSearchInputHandler = (value: string) => {
    setSearchWord(value);
  };
  const ClickedNavHandler = (value: string) => {
    setClickedNav(value);
  };

  return (
    <TopNavContentWrapper topNav={{ items: TopNavs }}>
      <div className="px-[2rem]">
        <div className="mb-[5rem] flex w-full justify-between">
          <Nav onClickNav={ClickedNavHandler} />
          <div className="mt-[1rem] flex gap-[2rem]">
            <SearchInput
              onChange={(value) => {
                ChangeSearchInputHandler(value);
              }}
            />
            <button
              className="h-[4rem] w-[20rem] rounded-2xl bg-main text-[1.6rem] font-[600] text-white"
              onClick={openModal}
            >
              인력 추가하기
            </button>
          </div>
        </div>
        <div>
          <EmployeeListHeader />
          {DUMMY.filter(
            (i) => clickedNav === "전체" || clickedNav === i.role
          ).map((i, index) => (
            <div key={index}>
              <EmployeeListItem
                name={i.name}
                role={i.role}
                department={i.department}
                specialty={i.specialty}
                toggleStatus={i.toggleStatus}
              />
            </div>
          ))}
        </div>
        <AddEmployModal isOpen={isOpen} closeModal={closeModal} />
        {isOpen && (
          <span className="fixed left-0 top-0 z-20 h-screen w-screen"></span>
        )}
      </div>
    </TopNavContentWrapper>
  );
}
