"use client";

import { ReactNode } from "react";
interface ScrollBoxProps {
  children: ReactNode;
}

export default function ScrollBox({ children }: ScrollBoxProps) {
  return (
    <div className="top-0 h-full overflow-y-scroll">
      <div>{children}</div>
    </div>
  );
}
