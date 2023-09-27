"use client";

import Count from "@/components/Count";
import Switch from "@/components/Switch";
import { useState } from "react";

interface EquipmentLineProps {
  key: number;
  title: string;
  set: boolean;
  cnt: number;
}

//part가 뭐하는건지 모르겠음 누가봐도 바로 알수있을정도의 이름으로 작성해야함
export default function EquipmentLine({
  key,
  title,
  set,
  cnt,
}: EquipmentLineProps) {
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
