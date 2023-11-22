"use client";

import Link from "next/link";
import useMenu from "./useMenu";

/**
 * 리팩토링 필요
 * useMenu 커스텀 훅으로 분리
 */
export default function BottomMenu() {
  const { expanded, openMenu, closeMenu } = useMenu();
  const handleMouseLeave = () => {
    closeMenu();
  };
  return (
    <div
      className="relative z-10 mt-[2rem] h-[8rem] w-[8rem] drop-shadow-xl"
      onMouseLeave={handleMouseLeave}
    >
      <span
        onClick={openMenu}
        className={`absolute bottom-0 left-0 z-10 transition-all duration-200 ease-in ${
          expanded
            ? "h-[38rem] w-[38rem] bg-white"
            : "h-[8rem] w-[8rem] cursor-pointer bg-main"
        } rounded-3xl`}
      >
        <div
          className={`relative transition-all ${
            expanded ? "opacity-100 delay-200 " : "opacity-0"
          }`}
        >
          {expanded ? (
            <>
              <div className="px-[3rem] py-[2rem]">
                <div className="mb-[2rem] text-[1.2rem] font-[500]">
                  <p>메뉴</p>
                </div>
                <div className="grid-row-4 grid grid-cols-2 gap-[1rem]">
                  <Link
                    href={"/requests"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                    }}
                  >
                    <div className="flex h-[6.3rem] w-[15.5rem] flex-col items-center justify-center rounded-xl bg-main text-[1.5rem] font-[600] text-white">
                      <p>환자 수용</p>
                      <p>요청 목록</p>
                    </div>
                  </Link>
                  <div className="flex h-[6.3rem] w-[15.5rem] flex-col items-center justify-center rounded-xl bg-main text-[1.5rem] font-[600] text-white">
                    <p>병동 정보 관리</p>
                  </div>
                  <Link
                    href={"/findHospitals"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                    }}
                  >
                    <div className="flex h-[6.3rem] w-[15.5rem] flex-col items-center justify-center rounded-xl bg-main text-[1.5rem] font-[600] text-white">
                      <p>타병원 찾기</p>
                    </div>
                  </Link>
                  <Link
                    href={"/message"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                    }}
                  >
                    <div className="flex h-[6.3rem] w-[15.5rem] flex-col items-center justify-center rounded-xl bg-main text-[1.5rem] font-[600] text-white">
                      <p>메세지</p>
                    </div>
                  </Link>
                  <Link
                    href={"/hrm"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                    }}
                  >
                    <div className="flex h-[6.3rem] w-[15.5rem] flex-col items-center justify-center rounded-xl bg-main text-[1.5rem] font-[600] text-white">
                      <p>인력 관리</p>
                    </div>
                  </Link>
                  <Link
                    href={"/department"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                    }}
                  >
                    <div className="flex h-[6.3rem] w-[15.5rem] flex-col items-center justify-center rounded-xl bg-main text-[1.5rem] font-[600] text-white">
                      <p>진료과 /</p>
                      <p>중증응급질환 관리</p>
                    </div>
                  </Link>
                  <Link
                    href={"/equipment"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                    }}
                  >
                    <div className="flex h-[6.3rem] w-[15.5rem] flex-col items-center justify-center rounded-xl bg-main text-[1.5rem] font-[600] text-white">
                      <p>장비 관리</p>
                    </div>
                  </Link>
                  <div className="flex h-[6.3rem] w-[15.5rem] flex-col items-center justify-center rounded-xl bg-main text-[1.5rem] font-[600] text-white">
                    <p>설정</p>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </span>
    </div>
  );
}