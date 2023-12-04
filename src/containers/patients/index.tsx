"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SearchInput from "@/components/common/SearchInput";
import useModal from "@/hooks/useModal";
import { ERPatientStatus } from "@/states/patientsStore";
import { useState } from "react";
import PatientAddModal from "./patientAddModal";
import PatientHeader from "./patientHeader";
import PatientNav from "./patientNav";
import PatientsBox from "./patientsBox";

const topNavs = [{ title: "환자 리스트", link: "/patients" }];

export default function PatientsContainer() {
  const [clickedNav, setClickedNav] = useState<ERPatientStatus | "전체">(
    "전체"
  );
  const [, setSearchWord] = useState("");
  const { isOpen, closeModal, openModal } = useModal();

  const ChanegeSearch = (word: string) => {
    setSearchWord(word);
  };

  const onClickNav = (value: ERPatientStatus | "전체") => {
    if (value === "전체") {
      setClickedNav("전체");
    } else {
      setClickedNav(value);
    }
  };

  return (
    <TopNavContentWrapper isScroll={false} topNav={{ items: topNavs }}>
      <div className="flex w-full justify-between pb-[6rem]">
        {isOpen && <PatientAddModal close={closeModal} />}
        <PatientNav onClickNav={onClickNav} />
        <div className="flex gap-[1rem]">
          <SearchInput onChange={ChanegeSearch} />
          <div
            className="flex h-[4rem] w-[20rem] cursor-pointer items-center justify-center rounded-2xl bg-main text-regular font-regular text-white"
            onClick={() => openModal()}
          >
            환자 추가하기 +
          </div>
        </div>
      </div>
      <div className="h-full w-full px-[1rem]">
        <PatientHeader />
        <div className="h-full w-full overflow-scroll">
          <PatientsBox clickdeNav={clickedNav} />
        </div>
      </div>
    </TopNavContentWrapper>
  );
}
