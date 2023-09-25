"use client";

import Switch from "@/components/switch/page";
import { useState } from "react";
import Part from "./part";

const DUMMY = [
  { title: "호흡기내과", set: false },
  { title: "순환기내과", set: true },
  { title: "소화기내과", set: true },
  { title: "혈액종양내과", set: true },
  { title: "내분비대사내과", set: false },
  { title: "알레르기내과", set: true },
  { title: "신장내과", set: true },
  { title: "감염내과", set: false },
  { title: "류마티스내과", set: true },
  { title: "내과(일반)", set: true },
  { title: "내과(입원의학)", set: true },
];

export default function InternalMedicine() {
  return (
    <div className="h-[59rem] w-[23.3rem]">
      <div className="flex justify-between">
        <p className="text-[2rem] font-[900]">내과</p>
        <button className="h-[3rem] w-[11rem] rounded-[3rem] bg-bg text-[1.2rem] font-[600] text-gray">
          내과 전체 선택하기
        </button>
      </div>
      <div className="border-l-2 border-L-gray pl-[2rem]">
        {DUMMY.map((i, index) => (
          <Part key={index} title={i.title} set={i.set} />
        ))}
      </div>
    </div>
  );
}
