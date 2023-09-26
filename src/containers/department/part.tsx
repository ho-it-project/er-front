"use client";

import Switch from "@/components/Switch";
import { useState } from "react";

interface PartProps {
  title: string;
  set: boolean;
}

export default function Part({ title, set }: PartProps) {
  const [toggle, setToggle] = useState(set);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <span className="my-[2rem] flex justify-between">
      <span className="text-[1.8rem] font-[600]">{title}</span>
      <Switch clickedToggle={clickedToggle} toggle={toggle} />
    </span>
  );
}
