"use client";

import { ReactNode } from "react";
interface ScrollBoxProps {
  children: ReactNode;
}

export default function ScrollBox({ children }: ScrollBoxProps) {
  return (
    <div className="top-0 h-[100%] overflow-y-scroll">
      <div className="">{children}</div>
    </div>
  );
}
