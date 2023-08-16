"use client";
import { motion } from "framer-motion";
import { ChevronRight, Menu as MenuIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import MainMenu from "./MainMenu";
import MenuBtn from "./MenuBtn";
// import Profile from "./profile";
import { usePathname } from "next/navigation";

import Profile from "./Profile";
import Sidebar from "./Sidebar";

export interface IPageHeader {
  title: string;
}

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  // const { user } = useAuth();
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false);
  const path = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const showSidebar = useCallback(() => {
    setIsShowSidebar(true);
  }, []);
  const hideSidebar = useCallback(() => {
    setIsShowSidebar(false);
  }, []);
  const setActive = useCallback((val: boolean) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setIsShowPopupMenu(val);
  }, []);
  useEffect(() => {
    setActive(false);
  }, [path, setActive]);

  if (!mounted) return null;
  // if (user?.role !== "admin") return <>{children}</>;
  return (
    <div>
      <Sidebar isShowSidebar={isShowSidebar} hideSidebar={hideSidebar} />

      {/* mobile navigation */}
      <div className="z-40 flex h-14 items-center justify-between border-b px-5 sm:hidden">
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-turquoise text-white"></div>
          <div className="ml-3 text-lg text-black">Purple Admin UI</div>
        </div>
        <div>
          <MenuBtn isActive={isShowPopupMenu} setActive={setActive} />
        </div>
      </div>
      <motion.div
        animate={isShowPopupMenu ? "open" : "closed"}
        initial={{ display: "none" }}
        variants={{
          open: { display: "block", opacity: 1, y: 0 },
          closed: {
            opacity: 0,
            y: "-10px",
            transitionEnd: { display: "none" },
          },
        }}
        transition={{ duration: 0.15 }}
        className="fixed bottom-0 left-0 right-0 z-30 w-full overflow-auto bg-white p-5"
        style={{ top: "3.5rem" }}
      >
        <Profile />
        <MainMenu />
      </motion.div>

      <div
        className={`sm:h-full sm:overflow-auto ${
          isShowSidebar ? "sm:ml-72" : ""
        }`}
      >
        {/* {!isShowSidebar ? (
          <div className="pl-7 pt-5">
            <button
              className="inline-flex h-12 items-center justify-center rounded px-3 transition-all duration-300 hover:bg-gray-200"
              onClick={showSidebar}
            >
              <MenuIcon className="h-5 w-5" />
              <span className="px-2">메뉴 열기</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <></>
        )} */}

        <section className="px-5 pb-5 sm:px-10">{children}</section>
        {!isShowSidebar ? (
          <div className="fixed bottom-5 left-5">
            <button
              className="enable-transition flex h-12 w-12 items-center justify-center rounded border bg-white opacity-50 hover:opacity-100"
              onClick={showSidebar}
            >
              <MenuIcon className="h-5 w-5" />
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default DefaultLayout;
