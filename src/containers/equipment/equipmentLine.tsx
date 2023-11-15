"use client";

import Count from "@/components/Count";
import Switch from "@/components/Switch";

interface EquipmentLineProps {
  id: number;
  count: number;
  name: string;
}

export default function EquipmentLine({ count, name }: EquipmentLineProps) {
  return (
    <span className="my-[3.5rem] flex justify-between gap-[2rem]">
      <span className="flex w-[26rem] justify-between">
        <span className="text-[2rem] font-[600]">{name}</span>
        <Switch set={count > 0} />
      </span>
      <Count cnt={count} toggle={count > 0} />
    </span>
  );
}
