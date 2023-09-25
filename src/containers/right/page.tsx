"use client";

import RequsetBox from "./requestBox";
import StatusBox from "./statusBox";

export default function Right() {
  const status = {
    a: 12,
    A: 12,
    aw: 12,
    b: 1,
    B: 3,
  };

  return (
    <div className="ml-[1rem] mr-[2rem] mt-[5rem] w-[40rem]">
      <p className="mx-auto w-[38rem] text-right text-[1.5rem] font-[600] text-gray">
        현재 시각 2023.09.11 23:40
      </p>
      <StatusBox status={status} />
      <div className="mx-auto">
        <div className="mt-[2rem] flex justify-between">
          <button className="h-[8rem] w-[28rem] rounded-2xl bg-main text-[2rem] font-[700] text-white">
            병상 정보 관리
          </button>
          <div className="relative h-[8rem] w-[8rem] rounded-2xl border-2 border-slate-100 bg-white"></div>
        </div>
        <div className="mt-[4rem]">
          <h4 className="text-[2rem] font-bold text-main">환자 수용 요청</h4>
          <div className="flex flex-col">
            <RequsetBox />
            <RequsetBox />
            <RequsetBox />
          </div>
        </div>
      </div>
    </div>
  );
}
