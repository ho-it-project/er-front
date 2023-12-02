"use client";

import useEmergencyRoomNumberStore from "@/states/emergencyRoomStore";

export const MainNav = () => {
  const { emergencyRoomNumber, setEmergencyRoomNumber, navs } =
    useEmergencyRoomNumberStore();

  const navItemClicked = (room: number) => {
    setEmergencyRoomNumber(room);
  };

  return (
    <div className="absolute -top-[5rem] left-0 flex h-[7rem] w-full min-w-[144rem] gap-[3rem]">
      {navs.map((item, index) => (
        <div
          key={index}
          className={`relative w-[26rem] cursor-pointer rounded-2xl bg-white pl-[3rem] pr-[2rem] pt-[2rem] text-[1.8rem] font-[700] text-main ${
            emergencyRoomNumber === index ? "opacity-100" : "opacity-80"
          }`}
        >
          <div
            key={`${item.title} ${index}`}
            onClick={() => navItemClicked(index)}
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};
