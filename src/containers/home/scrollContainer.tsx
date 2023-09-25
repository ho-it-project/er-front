"use client";

import PatientCard from "@/components/pages/home/patientCard/page";
import { useEffect, useRef } from "react";

export default function ScrollContainer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const scrollTop = containerRef.current?.scrollTop;
    if (scrollTop !== undefined) {
      console.log("scroll: ", scrollTop);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="h-[950rem] w-[130rem] overflow-hidden">
      <div className="h-full w-full overflow-y-scroll">
        {Array.from({ length: 3 }, (_, index) => (
          <div className="mb-[3rem] px-[3rem]" key={index}>
            <h4 className="text-[2rem] font-[600] text-main">
              {index + 1} 구역
            </h4>
            <div className="mt-4 grid grid-cols-5 grid-rows-2 gap-[2rem]">
              {Array.from({ length: 10 }, (_, index) => (
                <PatientCard key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
