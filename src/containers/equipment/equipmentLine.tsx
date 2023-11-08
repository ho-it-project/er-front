"use client";

import Count from "@/components/Count";
import Switch from "@/components/Switch";
import { useState } from "react";

interface EquipmentLineProps {
  id: number;
  count: number;
  name: string;
}

export default function EquipmentLine({ count, name }: EquipmentLineProps) {
  const [toggle, setToggle] = useState(count > 0);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <span className="my-[3.5rem] flex justify-between">
      <span className="flex w-[26rem] justify-between">
        <span className="text-[2rem] font-[600]">{name}</span>
        <Switch clickedToggle={clickedToggle} toggle={toggle} />
      </span>
      <Count cnt={count} toggle={toggle} />
    </span>
  );
}
