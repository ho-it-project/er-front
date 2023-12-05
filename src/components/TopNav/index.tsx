"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface TopNavItem {
  title: string;
  link: string;
}
interface TopNavProps {
  items: TopNavItem[];
  goHome?: boolean;
}

export const TopNav = ({ items, goHome }: TopNavProps) => {
  const pathname = usePathname();

  const [select, setSelect] = useState(pathname);
  const navItemClicked = (path: string) => {
    setSelect(path);
  };

  return (
    <div className="absolute -top-[5rem] left-0 flex h-[7rem] w-full min-w-[144rem] gap-[3rem]">
      {items.map((item, index) => (
        <div
          key={index}
          className={`relative w-[26rem] rounded-2xl bg-white pl-[3rem] pr-[2rem] pt-[2rem] text-[1.8rem] font-[700] text-main ${
            select === item.link ? "opacity-100" : "opacity-80"
          }`}
        >
          <Link href={`${item.link}`}>
            <div
              key={`${item.title} ${index}`}
              onClick={() => navItemClicked(item.link)}
            >
              {item.title}
            </div>
          </Link>
          {goHome && (
            <Link href={"/"} className="absolute right-[2rem] top-[2rem]">
              <Image
                src="/fi-rr-cross-small.png"
                width={24}
                height={24}
                alt="X"
              />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
