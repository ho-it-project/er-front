import { emergencyRoom } from "@/states/EmergencyCenterInfoStore";
import Image from "next/image";
import { useState } from "react";

interface RoomInfoProps {
  room: emergencyRoom;
}

export default function RoomInfo({ room }: RoomInfoProps) {
  const [modified, setModified] = useState<boolean>(false);
  return (
    <div className="relative flex items-center justify-between px-[2rem] text-medium font-medium">
      <span className="absolute -left-[0.65rem] h-[1rem] w-[1rem] rounded-full bg-main"></span>
      <div className="min-w-[15rem]">
        <div>{room.emergency_room_name}</div>
      </div>
      <div className="flex h-[8rem] w-full items-center justify-between rounded-2xl bg-bg p-[1rem] px-[4rem]">
        <div className="w-2/6 min-w-[15rem]">{room.emergency_room_name}</div>
        <div className="relative w-1/6 min-w-[15rem] pl-[2rem]">
          {modified && (
            <div className="absolute -left-[3rem] flex w-[12rem] items-center justify-between">
              <Image src={"/minus.png"} alt="빼기" width={20} height={20} />
              <Image src={"/plus.png"} alt="더하기" width={20} height={20} />
            </div>
          )}
          {room.emergency_room_beds.length}
        </div>
        <div className="relative w-1/6 min-w-[15rem] pl-[4rem]">
          {modified && (
            <div
              className={`absolute -left-[1rem] flex w-[12rem] items-center justify-between transition-all duration-100 ease-out
                ${modified ? "" : "hidden"}
            `}
            >
              <Image src={"/minus.png"} alt="빼기" width={20} height={20} />
              <Image src={"/plus.png"} alt="더하기" width={20} height={20} />
            </div>
          )}
          {
            room.emergency_room_beds.filter(
              (bed) => bed.emergency_room_bed_status === "OCCUPIED"
            ).length
          }
        </div>
        <div className="relative w-1/6 min-w-[15rem] pl-[2rem]">
          {modified && (
            <div
              className={`absolute -left-[3rem] flex w-[12rem] items-center justify-between transition-all duration-100 ease-out
                ${modified ? "" : "hidden"}
            `}
            >
              <Image src={"/minus.png"} alt="빼기" width={20} height={20} />
              <Image src={"/plus.png"} alt="더하기" width={20} height={20} />
            </div>
          )}
          0
        </div>
        <div className="flex w-1/6 min-w-[20rem] justify-end gap-[1rem]">
          {modified && (
            <div
              className="flex h-[3.7rem] w-[9rem] items-center justify-center rounded-full bg-L-gray text-white"
              onClick={() => setModified(false)}
            >
              삭제
            </div>
          )}
          <div
            className={`flex h-[3.7rem] w-[9rem] items-center justify-center rounded-full text-white transition-all duration-100 ease-out
                ${modified ? "bg-main" : "bg-L-gray"}
              `}
            onClick={() => setModified(!modified)}
          >
            {modified ? "완료" : "수정"}
          </div>
        </div>
      </div>
    </div>
  );
}
