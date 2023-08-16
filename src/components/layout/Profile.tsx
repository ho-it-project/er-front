"use client";
// import { useAuth } from "@/lib/auth/auth-provider";
import { ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import Dropdown from "../common/Dropdown";

interface MenuProp {
  items: {
    label: React.ReactNode;
    key: string;
  }[];
}
const Profile = () => {
  // const { signOut } = useAuth();

  const items: MenuProp["items"] = [
    {
      label: (
        <Link href="/sample/profile" className="link-with-icon min-w-[8rem]">
          <User width={16} height={16} />내 프로필
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <div
          className="link-with-icon hover:cursor-pointer"
          // onClick={signOut}
        >
          <LogOut width={16} height={16} />
          로그아웃
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <div className="ml-2">Administrator</div>

      <Dropdown menu={{ items }}>
        <button className="enable-transition flex items-center rounded px-2 text-gray-600 hover:bg-gray-200">
          <span className="ellipsis-text sm:max-w-[10rem]">admin</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </Dropdown>
    </>
  );
};

export default React.memo(Profile);
