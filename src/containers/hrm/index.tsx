"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SearchInput from "@/components/common/SearchInput";
import useDepartments from "@/hooks/useDepartments";
import { useEmoployeeList } from "@/hooks/useEmployeeList";
import useModal from "@/hooks/useModal";
import { useEmployeeListStore } from "@/states/employeeStore";
import { Role } from "@/type";
import { useRef, useState } from "react";
import AddEmployModal from "./addEmployModal";
import EmployeeListHeader from "./employeeListHeader";
import EmployeeListItem from "./employeeListItem";
import EmployeeNav from "./employeeNav";

const TopNavs = [{ title: "인력 관리", link: "/hrm" }];

export default function HRMContainer() {
  const employeeListRef = useRef(null);
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

  const [, setScrollPosition] = useState(0);

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

  return (
    <TopNavContentWrapper isScroll={false} topNav={{ items: TopNavs }}>
      <div className="h-full w-full px-[2rem]">
        <div className="sticky top-0 z-[1] flex w-full justify-between bg-white pb-[5rem]">
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
        <div
          className="h-full w-full overflow-scroll pb-[5rem]"
          ref={employeeListRef}
          onScroll={(e) => {
            const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
            if (scrollHeight - scrollTop === clientHeight) {
              if (query.page < pageLimit.total_page) {
                setScrollPosition(scrollTop);
                setQueryPage(query.page + 1);
              }
            }
          }}
        >
          {isLoading ? (
            <h1>로딩중...</h1>
          ) : (
            employees.map((i, index) => (
              <div key={index}>
                <EmployeeListItem
                  name={i.employee_name}
                  role={i.role}
                  department_list={department_list}
                  department={String(i.department_id)}
                  toggleStatus={i.status === "ACTIVE"}
                />
              </div>
            ))
          )}
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
