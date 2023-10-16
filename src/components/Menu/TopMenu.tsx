"use client";

import useLoginStore from "@/states/loginStore";
import LoginBox from "../Login";
import { Card } from "../common/Card";
import useMenu from "./useMenu";

export default function TopMenu() {
  const { expanded, openMenu, closeMenu } = useMenu();
  const { isLogin, login, logout, isOpen, openLoginBox } = useLoginStore();

  return (
    <>
      {expanded ? (
        <InFo closeMenu={closeMenu} />
      ) : (
        <Card size="small" bg="gray">
          <div
            onClick={isLogin ? openMenu : openLoginBox}
            className="h-[8rem] w-[8rem] cursor-pointer"
          ></div>
        </Card>
      )}
      {isOpen && <LoginBox />}
    </>
    // <Card>
    //   <span
    //     onClick={openMenu}
    //     className={`absolute left-0 top-0 z-10 transition-all duration-200 ease-in ${
    //       expanded
    //         ? "h-[38rem] w-[38rem] bg-white"
    //         : "h-[8rem] w-[8rem] cursor-pointer bg-gray"
    //     } rounded-3xl`}
    //   >
    //     <div
    //       className={`relative transition-all ${
    //         expanded ? "opacity-100 delay-200 " : "opacity-0"
    //       }`}
    //     >
    //       {expanded && isLogin ? (
    //         <InFo closeMenu={closeMenu} />
    //       ) : (
    //         <LoginMenu openLoginBox={openLoginBox} />
    //       )}
    //     </div>
    //   </span>
    // </Card>
  );
}

interface InfoProps {
  closeMenu: () => void;
}

function InFo({ closeMenu }: InfoProps) {
  return (
    <Card size="x-medium" bg="white">
      <div className="absolute left-0 top-0 z-10">
        <span
          onClick={(e) => {
            e.stopPropagation();
            closeMenu();
          }}
          className="absolute right-5 top-3 cursor-pointer text-xl font-bold"
        >
          X
        </span>
        <div className="px-[3rem] pt-[3rem]">
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
        </div>
      </div>
    </Card>
  );
}

interface LoginMenuProps {
  openLoginBox: () => void;
}

function LoginMenu({ openLoginBox }: LoginMenuProps) {
  return (
    <Card size="x-medium">
      <div className="absolute left-0 top-0 z-10 h-[38rem] w-[38rem] bg-white">
        <button onClick={openLoginBox}>로그인</button>
      </div>
    </Card>
  );
}
