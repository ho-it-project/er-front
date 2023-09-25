"use client";

import Switch from "@/components/switch/page";
import { useState } from "react";

interface PartProps {
  key: number;
  title: string;
  set: boolean;
}

export default function Part({ key, title, set }: PartProps) {
  const [toggle, setToggle] = useState(set);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <span className="my-[2rem] flex justify-between" key={key}>
      <span className="text-[1.8rem] font-[600]">{title}</span>
      <Switch clickedToggle={clickedToggle} toggle={toggle} />
    </span>
  );
}
