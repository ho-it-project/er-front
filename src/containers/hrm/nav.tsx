"use client";

import { useState } from "react";

export default function Nav() {
  const [selected, setSeleted] = useState(0);
  const handleSelected = (index: number) => {
    setSeleted(index);
  };

  return (
    <div className="flex w-[38rem] items-center justify-around text-[2rem] font-[700]">
      <span
        onClick={() => handleSelected(0)}
        className={`${selected == 0 ? "text-main" : ""} cursor-pointer`}
      >
        전문의/전공의
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => handleSelected(1)}
        className={`${selected == 1 ? "text-main" : ""} cursor-pointer`}
      >
        간호사
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => handleSelected(2)}
        className={`${selected == 2 ? "text-main" : ""} cursor-pointer`}
      >
        응급구조사
      </span>
    </div>
  );
}
