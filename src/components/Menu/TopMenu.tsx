"use client";

import useLoginStore from "@/states/loginStore";
import { Transition } from "@headlessui/react";
import { ReactNode } from "react";
import LoginBox from "../Login";
import useMenu from "./useMenu";

export default function TopMenu() {
  const { expanded, openMenu, closeMenu } = useMenu();
  const { isLogin, isOpen, openLoginBox } = useLoginStore();

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
    ></div>
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
