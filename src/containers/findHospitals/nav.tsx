"use client";

import { useState } from "react";

interface NavProps {
  onClickNav: (value: string) => void;
}

export default function Nav({ onClickNav }: NavProps) {
  const [selected, setSeleted] = useState(0);
  const handleSelected = (index: number) => {
    setSeleted(index);
  };

  return (
    <div className="flex h-[3rem] w-[60rem] items-center justify-around text-[2rem] font-[700]">
      <span
        onClick={() => {
          handleSelected(0);
          onClickNav("전체");
        }}
        className={`${selected == 0 ? "text-main" : ""} cursor-pointer`}
      >
        전체
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(1);
          onClickNav("LOCAL_EMERGENCY_MEDICAL_CENTER");
        }}
        className={`${selected == 1 ? "text-main" : ""} cursor-pointer`}
      >
        권역응급의료센터
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(2);
          onClickNav("REGIONAL_EMERGENCY_MEDICAL_CENTER");
        }}
        className={`${selected == 2 ? "text-main" : ""} cursor-pointer`}
      >
        지역응급의료센터
      </span>
      <span className="text-main30">|</span>
      <span
        onClick={() => {
          handleSelected(3);
          onClickNav("LOCAL_EMERGENCY_MEDICAL_INSTITUTION");
        }}
        className={`${selected == 3 ? "text-main" : ""} cursor-pointer`}
      >
        지역응급의료기관
      </span>
    </div>
  );
}
