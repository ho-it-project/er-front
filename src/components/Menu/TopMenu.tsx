"use client";

import useLoginStore from "@/states/loginStore";
import { Transition } from "@headlessui/react";
import { ReactNode } from "react";
import LoginBox from "../Login";
import useMenu from "./useMenu";

export default function TopMenu() {
  const { expanded, openMenu, closeMenu } = useMenu();
  const { isLogin, isOpen, openLoginBox } = useLoginStore();
  // console.log("isLogin", isLogin);
  // console.log("expanded", expanded);
  // console.log("isOpen", isOpen);

  return (
    <>
      <MenuBoxTransition expanded={expanded}>
        {isLogin && <InFo closeMenu={closeMenu} />}
      </MenuBoxTransition>
      <MenuBoxTransition expanded={!expanded}>
        <div
          onClick={isLogin ? openMenu : openLoginBox}
          className="absolute left-0 top-0 z-10 h-[8rem] w-[8rem] cursor-pointer rounded-3xl bg-L-gray transition-transform duration-200"
        ></div>
      </MenuBoxTransition>
      {isOpen && <LoginBox />}
    </>
  );
}

interface InfoProps {
  closeMenu: () => void;
}

function InFo({ closeMenu }: InfoProps) {
  const handleMouseLeave = () => {
    closeMenu();
  };
  return (
    <div
      className="absolute left-0 top-0 z-10 h-[38rem] w-[38rem] rounded-3xl bg-white drop-shadow-xl transition-transform duration-200"
      onMouseLeave={handleMouseLeave}
    >
      {/* <div className="px-[3rem] pt-[3rem]">
        <div className="mb-[1rem] flex justify-between">
          <p className="text-[1.2rem] text-gray">응급실 정보</p>
          <p className="text-[1.2rem] text-gray">수정하기</p>
        </div>
        <div className="mb-[2rem] flex items-center">
          <div className="h-[7.5rem] w-[7.5rem] rounded-full bg-bg "></div>
          <div className="ml-[1rem]">
            <p className="mb-[0.5rem] text-[1.5rem] font-[600] text-main">
              서울의료원 강남분원
            </p>
            <p className="text-[1.2rem] font-[500]">서울의료원 강남분원</p>
            <p className="text-[1.2rem] font-[500]">
              서울의료원 강남분원서울의료원 강남분원
            </p>
          </div>
        </div>
        <div className="mb-[1rem] h-1 w-[32rem] rounded bg-main30"></div>
      </div>
      <div className="px-[3rem] pt-[1rem]">
        <div className="mb-[1rem] flex justify-between">
          <p className="text-[1.2rem] text-gray">전문의</p>
          <p className="text-[1.2rem] text-gray">수정하기</p>
        </div>
        <div className="mb-[2rem] flex items-center">
          <div className="h-[5.8rem] w-[5.8rem] rounded-full bg-bg "></div>
          <div className="ml-[1rem]">
            <p className="mb-[0.5rem] text-[1.5rem] font-[600] text-main">
              서울의료원 강남분원
            </p>
            <p className="text-[1.2rem] font-[500]">호흡기내과 전문의</p>
          </div>
        </div>
        <div className="mb-[2rem] flex items-center">
          <div className="h-[5.8rem] w-[5.8rem] rounded-full bg-bg "></div>
          <div className="ml-[1rem]">
            <p className="mb-[0.5rem] text-[1.5rem] font-[600] text-main">
              서울의료원 강남분원
            </p>
            <p className="text-[1.2rem] font-[500]">호흡기내과 전문의</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

interface MenuBoxTransitionProps {
  children: ReactNode;
  expanded: boolean;
}

function MenuBoxTransition({ children, expanded }: MenuBoxTransitionProps) {
  return (
    <Transition
      className="relative"
      show={expanded}
      enter="transition-opacity opacity-0 duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity opacity-100 duration-0"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}
