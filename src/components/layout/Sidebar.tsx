import { ChevronLeft, MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import MainMenu from "./MainMenu";
import Profile from "./Profile";
import style from "./default-layout.module.css";

interface ISidebarProps {
  isShowSidebar: boolean;
  hideSidebar: () => void;
}

const Sidebar = ({ isShowSidebar, hideSidebar }: ISidebarProps) => {
  return (
    <aside
      className={`hidden ${style.sidebar} ${
        isShowSidebar ? "sm:block" : "hidden"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex">
          <div className="shrink-0">
            <Link
              href="/"
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-turquoise text-white"
            >
              P
            </Link>
          </div>
          <div className="ml-1 grow">
            <Profile />
          </div>
        </div>
        <div className="grow overflow-auto">
          <MainMenu />
        </div>
        <div>
          <div className="flex justify-end">
            <button
              className="enable-transition flex h-12 w-12 items-center justify-center rounded hover:bg-gray-200"
              onClick={hideSidebar}
            >
              <ChevronLeft className="h-3 w-3" />
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
