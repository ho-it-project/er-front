"use client";

import Count from "@/components/count/page";
import Switch from "@/components/switch/page";
import { useState } from "react";

interface PartProps {
  key: number;
  title: string;
  set: boolean;
  cnt: number;
}

export default function Part({ key, title, set, cnt }: PartProps) {
  const [toggle, setToggle] = useState(set);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <span className="my-[3.5rem] flex justify-between">
      <span className="flex w-[26rem] justify-between" key={key}>
        <span className="text-[2rem] font-[600]">{title}</span>
        <Switch clickedToggle={clickedToggle} toggle={toggle} />
      </span>
      <Count cnt={cnt} toggle={toggle} />
    </span>
  );
}
