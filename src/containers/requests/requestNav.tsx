"use client";

import { RequestStatus } from "@/states/requestStore";
import { useState } from "react";

interface NavProps {
  onClickNav: (value: RequestStatus[] | "전체") => void;
}

export default function RequestNav({ onClickNav }: NavProps) {
  const [selected, setSeleted] = useState(0);
  const handleSelected = (index: number) => {
    setSeleted(index);
  };

  return (
    <div className="flex min-w-[50rem] items-center justify-around text-[2rem] font-[700]">
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
          onClickNav(["REQUESTED", "VIEWED"]);
        }}
        className={`${selected == 1 ? "text-main" : ""} cursor-pointer`}
      >
        응답대기
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(2);
          onClickNav(["REJECTED"]);
        }}
        className={`${selected == 2 ? "text-main" : ""} cursor-pointer`}
      >
        요청거절
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(3);
          onClickNav(["ACCEPTED", "TRANSFER"]);
        }}
        className={`${selected == 3 ? "text-main" : ""} cursor-pointer`}
      >
        이송대기
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(4);
          onClickNav(["TRANSFER_COMPLETED", "COMPLETED"]);
        }}
        className={`${selected == 4 ? "text-main" : ""} cursor-pointer`}
      >
        이송완료
      </span>
    </div>
  );
}
