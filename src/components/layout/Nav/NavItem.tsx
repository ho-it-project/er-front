"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IMenu } from ".";

interface INavItemProps {
  item: IMenu;
}

const NavItem = ({ item }: INavItemProps) => {
  const router = useRouter();

  return (
    <li>
      <Link
        href={{
          pathname: item.link?.path ?? "/",
          query: item.link?.query,
        }}
        // className={
        //   (item.isActive || isEqualPath)(router, item.link) ? "active" : ""
        // }
      >
        {item.icon}
        <span className="grow cursor-pointer">{item.name}</span>
        <ChevronRight className="active-check h-6 w-6 text-white" />
      </Link>
    </li>
  );
};

export default React.memo(NavItem);
