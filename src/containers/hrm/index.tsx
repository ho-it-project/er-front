"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SearchInput from "@/components/common/SearchInput";
import useModal from "@/hooks/useModal";
import { useEffect, useState } from "react";
import AddEmployModal from "./addEmployModal";
import EmployeeListHeader from "./employeeListHeader";
import EmployeeListItem from "./employeeListItem";
import Nav from "./nav";

interface Employee {
  employee_name: string;
  role: string;
  status: string;
}

const TopNavs = [{ title: "인력 관리", link: "/hrm" }];

export default function HRMContainer() {
  const { isOpen, openModal, closeModal } = useModal();

  const [, setSearchWord] = useState("");
  const [clickedNav, setClickedNav] = useState("전체");

  const [employee, setEmployee] = useState<Employee[]>([]);

  const ChangeSearchInputHandler = (value: string) => {
    setSearchWord(value);
  };
  const ClickedNavHandler = (value: string) => {
    setClickedNav(value);
  };

  useEffect(() => {
    const url = "/api/er/employee";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("직원 데이터", data);
        setEmployee(data.result.employee_list);
      });
  }, []);

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
          {employee
            .filter((i) => clickedNav === "전체" || clickedNav === i.role)
            .map((i, index) => (
              <div key={index}>
                <EmployeeListItem
                  name={i.employee_name}
                  role={i.role}
                  department={"응급의학과"}
                  specialty={"중환자의학"}
                  toggleStatus={i.status === "ACTIVE"}
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
