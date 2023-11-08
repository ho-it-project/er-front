"use client";

import Switch from "@/components/Switch";
import { useState } from "react";

interface DepartmentLineProps {
  title: string;
  set: boolean;
}

export default function DepartmentLine({ title, set }: DepartmentLineProps) {
  const [toggle, setToggle] = useState(set);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <span className="mb-[2rem] flex justify-between">
      <span className="text-[1.8rem] font-[700]">{title}</span>
      <Switch clickedToggle={clickedToggle} toggle={toggle} />
    </span>
  );
}
