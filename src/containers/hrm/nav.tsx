"use client";

import { useState } from "react";

interface NavProps {
  onClickNav: (value: string[]) => void;
}

export default function Nav({ onClickNav }: NavProps) {
  const [selected, setSeleted] = useState(0);
  const handleSelected = (index: number) => {
    setSeleted(index);
  };

  return (
    <div className="flex min-w-[38rem] items-center justify-around text-[2rem] font-[700]">
      <span
        onClick={() => {
          handleSelected(0);
          onClickNav(["전체"]);
        }}
        className={`${selected == 0 ? "text-main" : ""} cursor-pointer `}
      >
        전체
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(1);
          onClickNav(["SPECIALIST", "RESIDENT"]);
        }}
        className={`${selected == 1 ? "text-main" : ""} cursor-pointer`}
      >
        전문의/전공의
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(2);
          onClickNav(["NURSE"]);
        }}
        className={`${selected == 2 ? "text-main" : ""} cursor-pointer`}
      >
        간호사
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(3);
          onClickNav(["RECEPTIONIST"]);
        }}
        className={`${selected == 3 ? "text-main" : ""} cursor-pointer`}
      >
        응급구조사
      </span>
    </div>
  );
}
