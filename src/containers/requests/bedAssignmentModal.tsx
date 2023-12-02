import { useEmoployeeList } from "@/hooks/useEmployeeList";
import useEmergencyCenterInfoStore from "@/states/EmergencyCenterInfoStore";
import useUserStore from "@/states/userStore";
import Image from "next/image";
import { useState } from "react";
import DropDownInput from "./dropdownInput";

interface BedAssignmentModalProps {
  patientId: string;
  closeModal: () => void;
}

export default function BedAssignmentModal({
  patientId,
  closeModal,
}: BedAssignmentModalProps) {
  const { accessToken } = useUserStore();
  const { emergencyCenterInfo } = useEmergencyCenterInfoStore();
  const { employees } = useEmoployeeList();

  const [emergencyRoom, setEmergencyRoom] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [doctor, setDoctor] = useState("");
  const [nurse, setNurse] = useState("");

  const ChangeEmergencyRoom = (room: string) => {
    setEmergencyRoom(room);
  };
  const ChangeRoomNumber = (number: string) => {
    setRoomNumber(number);
  };
  const ChangeDoctor = (doctor: string) => {
    setDoctor(doctor);
  };
  const ChangeNurse = (nurse: string) => {
    setNurse(nurse);
  };

  const Rooms = emergencyCenterInfo?.emergency_rooms.map((room) => ({
    value: room.emergency_room_name,
    code: room.emergency_room_id,
  }));

  const Numbers = emergencyCenterInfo?.emergency_rooms
    .find((room) => room.emergency_room_id === emergencyRoom)
    ?.emergency_room_beds.map((bed) => ({
      value: bed.emergency_room_bed_num.toString(),
      code: bed.emergency_room_bed_num.toString(),
    }));

  const Doctors = employees
    .filter(
      (employee) =>
        employee.role === "SPECIALIST" || employee.role === "RESIDENT"
    )
    .map((employee) => ({
      value: employee.employee_name,
      code: employee.employee_id,
    }));

  const Nurses = employees
    .filter((employee) => employee.role === "NURSE")
    .map((employee) => ({
      value: employee.employee_name,
      code: employee.employee_id,
    }));

  const onClickSubmit = () => {
    const url = `/api/er/request-patients/${patientId}`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        emergency_room_id: emergencyRoom,
        emergency_room_bed_num: Number(roomNumber),
        doctor_id: doctor,
        nurse_id: nurse,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((d) => {
        console.log(d);

        closeModal();
      });
  };
  return (
    <div className="fixed left-1/2 top-1/2 z-30 h-[50rem] w-[82rem] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-bg px-[2rem] py-[3rem] drop-shadow-lg">
      <span className="absolute -top-[5rem] left-0 flex h-[7rem] w-[26rem] items-center justify-between rounded-2xl bg-bg px-[2rem]">
        <p className="text-[1.8rem] font-[600] text-main">병상배치하기</p>
        <Image
          className="cursor-pointer"
          src="/fi-rr-cross-small.png"
          width={24}
          height={24}
          alt="닫기"
          onClick={closeModal}
        />
      </span>
      <button
        className="absolute right-[3rem] top-[2rem] h-[5.4rem] w-[20rem] rounded-2xl bg-main text-[1.6rem] font-[600] text-white"
        onClick={() => {
          onClickSubmit();
        }}
      >
        배치하기
      </button>
      <div className="flex flex-col gap-[4rem] px-[5rem] pt-[13rem] text-medium font-large text-main">
        {Rooms && (
          <div className="flex items-center justify-between gap-[2rem]">
            <div>병동구역</div>
            <DropDownInput
              onChange={ChangeEmergencyRoom}
              values={Rooms}
              value={emergencyRoom}
            />
          </div>
        )}
        {emergencyRoom !== "" && Numbers && (
          <div className="flex items-center justify-between gap-[2rem]">
            <div>병상번호</div>
            <DropDownInput
              onChange={ChangeRoomNumber}
              values={Numbers}
              value={roomNumber}
            />
          </div>
        )}
        {Doctors && (
          <div className="flex items-center justify-between gap-[2rem]">
            <div>의사</div>
            <DropDownInput
              onChange={ChangeDoctor}
              values={Doctors}
              value={doctor}
            />
          </div>
        )}
        {Nurses && (
          <div className="flex items-center justify-between gap-[2rem]">
            <div>간호사</div>
            <DropDownInput
              onChange={ChangeNurse}
              values={Nurses}
              value={nurse}
            />
          </div>
        )}
      </div>
    </div>
  );
}
