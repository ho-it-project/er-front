"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SearchInput from "@/components/common/SearchInput";
import useDepartments from "@/hooks/useDepartments";
import useModal from "@/hooks/useModal";
import useUpdateStore from "@/states/employeeUpdateStore";
import { Role } from "@/type";
import { useEffect, useState } from "react";
import AddEmployModal from "./addEmployModal";
import EmployeeListHeader from "./employeeListHeader";
import EmployeeListItem from "./employeeListItem";
import Nav from "./nav";

interface Employee {
  department_id: number;
  employee_name: string;
  role: Role;
  status: string;
  employee_doctor_specializations?: string[];
  employee_nurse_specializations?: string[];
}

const TopNavs = [{ title: "인력 관리", link: "/hrm" }];

export default function HRMContainer() {
  const { data: departments } = useDepartments();

  const department_list = departments
    ? departments.map((item) => {
        return {
          value: item.department_name,
          code: item.department_id.toString(),
        };
      })
    : [];

  const { isOpen, openModal, closeModal } = useModal();
  const [, setSearchWord] = useState("");
  const [clickedNav, setClickedNav] = useState(["전체"]);

  const [employee, setEmployee] = useState<Employee[]>([]);

  const { isUpdate, reset } = useUpdateStore();

  const ChangeSearchInputHandler = (value: string) => {
    setSearchWord(value);
  };
  const ClickedNavHandler = (value: string[]) => {
    setClickedNav(value);
  };

  useEffect(() => {
    const url = "/api/er/employees";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEmployee(data.result.employee_list);
        reset();
      });
  }, [isUpdate, reset]);

  return (
    <TopNavContentWrapper topNav={{ items: TopNavs }}>
      <div className="px-[2rem]">
        <div className="sticky top-0 z-[1] flex w-full justify-between bg-white pb-[5rem]">
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
        <EmployeeListHeader />
        <div>
          {employee
            .filter(
              (i) => clickedNav.includes("전체") || clickedNav.includes(i.role)
            )
            .map((i, index) => (
              <div key={index}>
                <EmployeeListItem
                  name={i.employee_name}
                  role={i.role}
                  department_list={department_list}
                  department={String(i.department_id)}
                  toggleStatus={i.status === "ACTIVE"}
                />
              </div>
            ))}
        </div>
        <AddEmployModal
          isOpen={isOpen}
          closeModal={closeModal}
          departments={department_list}
        />
        {isOpen && (
          <span className="fixed left-0 top-0 z-20 h-screen w-screen"></span>
        )}
      </div>
    </TopNavContentWrapper>
  );
}
