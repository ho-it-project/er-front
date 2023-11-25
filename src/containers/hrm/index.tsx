"use client";

import Spinner from "@/components/Spinner";
import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SearchInput from "@/components/common/SearchInput";
import useDepartments from "@/hooks/useDepartments";
import { useEmoployeeList } from "@/hooks/useEmployeeList";
import useModal from "@/hooks/useModal";
import { useEmployeeListStore } from "@/states/employeeStore";
import { Role } from "@/type";
import { useEffect, useRef, useState } from "react";
import AddEmployModal from "./addEmployModal";
import EmployeeListHeader from "./employeeListHeader";
import EmployeeListItem from "./employeeListItem";
import EmployeeNav from "./employeeNav";

const TopNavs = [{ title: "인력 관리", link: "/hrm" }];

export default function HRMContainer() {
  const employeeListRef = useRef<HTMLDivElement>(null);
  const { query, setQueryPage, setQeuryRole, pageLimit } =
    useEmployeeListStore();

  const { employees, isLoading } = useEmoployeeList();

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
  const [, setClickedNav] = useState<Role[] | string>("전체");

  const ChangeSearchInputHandler = (value: string) => {
    setSearchWord(value);
  };
  const ClickedNavHandler = (value: Role[] | "전체") => {
    setClickedNav(value);
    if (value !== "전체") {
      setQeuryRole(value);
    } else {
      setQeuryRole([]);
    }
  };

  useEffect(() => {
    if (employeeListRef.current) {
      employeeListRef.current.scrollTo(0, 0);
    }
  }, [query.role, query.page]);

  return (
    <TopNavContentWrapper isScroll={false} topNav={{ items: TopNavs }}>
      <div className="h-full w-full px-[2rem] pb-[2rem]">
        <div className="top-0 z-[1] flex w-full justify-between bg-white pb-[5rem]">
          <EmployeeNav onClickNav={ClickedNavHandler} />
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
        {isLoading ? (
          <Spinner />
        ) : (
          <div
            className="h-full w-full overflow-scroll pb-[12rem]"
            ref={employeeListRef}
            onScroll={(e) => {
              const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
              if (scrollHeight - scrollTop === clientHeight) {
                if (query.page < pageLimit.total_page) {
                  setQueryPage(query.page + 1);
                }
              }
            }}
          >
            {employees.map((employee, index) => (
              <div key={index}>
                <EmployeeListItem
                  name={employee.employee_name}
                  role={employee.role}
                  department_list={department_list}
                  department={String(employee.department_id)}
                  toggleStatus={employee.status === "ACTIVE"}
                />
              </div>
            ))}
          </div>
        )}
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
