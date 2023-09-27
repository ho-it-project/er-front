"use client";

import DepartmentLine from "./deparmentLine";
import { ReactNode } from "react";

interface BoardProps {
  children: ReactNode;
}

const DUMMY = [
  { title: "감단췌외과", set: true },
  { title: "위장관외과", set: false },
  { title: "대장항문외과", set: true },
  { title: "유방내분비외과", set: true },
  { title: "이식혈관외과", set: true },
  { title: "외상외과", set: true },
  { title: "외과(일반)", set: true },
  { title: "외과(입원의학)", set: true },
];

export default function Surgery({ children }: BoardProps) {
  return (
    <div className="h-[59rem] w-[23.3rem]">
      <div className="flex justify-between">
        <p className="text-[2rem] font-[900]">외과</p>
        <button className="h-[3rem] w-[11rem] rounded-[3rem] bg-bg text-[1.2rem] font-[600] text-gray">
          외과 전체 선택하기
        </button>
      </div>
      <div className="border-l-2 border-L-gray pl-[2rem]">
        {DUMMY.map((i, index) => (
          <DepartmentLine key={index} title={i.title} set={i.set} />
        ))}
      </div>
      {children}
    </div>
  );
}
