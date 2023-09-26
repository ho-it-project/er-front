"use client";
import { useState } from "react";

interface TopNavItem {
  title: string;
}
interface TopNavProps {
  items: TopNavItem[];
}

export const TopNav = ({ items }: TopNavProps) => {
  const [select, setSelect] = useState(0);
  const navItemClicked = (index: number) => {
    setSelect(index);
  };

  return (
    <div className="absolute -top-[5rem] left-0 flex h-[7rem] w-full min-w-[144rem] gap-[3rem]">
      {items.map((item, index) => (
        <div
          key={`${item.title} ${index}`}
          className={`w-[26rem]  rounded-2xl bg-white pl-[3rem] pt-[2rem] text-[1.8rem] font-[700] text-main ${
            select === index ? "opacity-100" : "opacity-80"
          }`}
          onClick={() => navItemClicked(index)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

// export const a = ({ title, set, index }: TopNavProps) => {
//   return (
//     <span
//       className={`absolute -top-[5rem] flex h-[7rem] w-[26rem] rounded-2xl bg-white ${
//         set ? "opacity-100" : "opacity-80"
//       }
//       left-[${index * 30}rem]
//       `}
//     >
//       <span className="pl-[3rem] pt-[2rem] text-[1.8rem] font-[700] text-main">
//         {title}
//       </span>
//     </span>
//   );
// };
