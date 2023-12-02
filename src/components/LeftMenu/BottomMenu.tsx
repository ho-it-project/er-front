"use client";

import MenuContent from "./MenuContent";
import useMenu from "./useMenu";

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
          {expanded ? <MenuContent closeMenu={closeMenu} /> : null}
        </div>
      </span>
    </div>
  );
}
