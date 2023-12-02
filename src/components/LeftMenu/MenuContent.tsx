import Link from "next/link";
import React from "react";

interface MenuContentProps {
  closeMenu: () => void;
}

const MenuContent = React.memo(({ closeMenu }: MenuContentProps) => {
  return (
    <div className="px-[3rem] py-[2rem]">
      <div className="pb-[2rem] text-[1.2rem] font-[500]">
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
          <div className="flex h-[6.3rem] w-[15.5rem] cursor-pointer flex-col items-center justify-center rounded-xl bg-main text-[1.5rem] font-[600] text-white">
            <p>환자 수용</p>
            <p>요청 목록</p>
          </div>
        </Link>
        <Link
          href={"/roomManagement"}
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            closeMenu();
          }}
        >
          <div className="flex h-[6.3rem] w-[15.5rem] flex-col items-center justify-center rounded-xl bg-main text-[1.5rem] font-[600] text-white">
            <p>병동 구역 관리</p>
          </div>
        </Link>
        <Link
          href={"/findHospitals"}
          passHref
          prefetch={false}
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
          passHref
          prefetch={false}
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
          passHref
          prefetch={false}
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
          passHref
          prefetch={false}
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
          passHref
          prefetch={false}
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
  );
});

MenuContent.displayName = "MenuContent";

export default MenuContent;
