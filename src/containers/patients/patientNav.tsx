"use client";

import { ERPatientStatus } from "@/states/patientsStore";
import { useState } from "react";

interface NavProps {
  onClickNav: (value: ERPatientStatus | "전체") => void;
}

export default function PatientNav({ onClickNav }: NavProps) {
  const [selected, setSeleted] = useState(0);
  const handleSelected = (index: number) => {
    setSeleted(index);
  };

  return (
    <div className="flex min-w-[25rem] items-center justify-around text-[2rem] font-[700]">
      <span
        onClick={() => {
          handleSelected(0);
          onClickNav("전체");
        }}
        className={`${selected == 0 ? "text-main" : ""} cursor-pointer `}
      >
        전체
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(1);
          onClickNav("PENDING");
        }}
        className={`${selected == 1 ? "text-main" : ""} cursor-pointer`}
      >
        병상대기
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(2);
          onClickNav("ADMISSION");
        }}
        className={`${selected == 2 ? "text-main" : ""} cursor-pointer`}
      >
        배치완료
      </span>
    </div>
  );
}
