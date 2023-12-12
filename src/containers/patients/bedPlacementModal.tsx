import useEmergencyCenterInfoStore from "@/states/EmergencyCenterInfoStore";
import { usePatientListStore } from "@/states/patientsStore";
import useUserStore from "@/states/userStore";
import Image from "next/image";
import { useState } from "react";
import DropDownInput from "../requests/dropdownInput";

interface BedAssignmentModalProps {
  patientId: string;
  closeModal: () => void;
  close: () => void;
}
interface GetData {
  is_success: boolean;
  message: string;
  result: string;
}

export default function BedPlacementModal({
  patientId,
  closeModal,
  close,
}: BedAssignmentModalProps) {
  const { accessToken } = useUserStore();
  const { emergencyCenterInfo } = useEmergencyCenterInfoStore();
  const { setPatients } = usePatientListStore();

  const [emergencyRoom, setEmergencyRoom] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");

  const ChangeEmergencyRoom = (room: string) => {
    setEmergencyRoom(room);
  };
  const ChangeRoomNumber = (number: string) => {
    setRoomNumber(number);
  };

  const Rooms = emergencyCenterInfo?.emergency_rooms.map((room) => ({
    value: room.emergency_room_name,
    code: room.emergency_room_id,
  }));

  const Numbers = emergencyCenterInfo?.emergency_rooms
    .find((room) => room.emergency_room_id === emergencyRoom)
    ?.emergency_room_beds.filter(
      (bed) => bed.emergency_room_bed_status !== "OCCUPIED"
    )
    .map((bed) => ({
      value: bed.emergency_room_bed_num.toString(),
      code: bed.emergency_room_bed_num.toString(),
    }))
    .sort((a, b) => parseInt(a.code) - parseInt(b.code));

  const onClickSubmit = () => {
    const url = `/api/er/emergency-centers/emergency-room/${emergencyRoom}/beds/${roomNumber}`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        patient_id: patientId,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data: GetData) => {
        if (data && data.is_success) {
          setPatients((prevPatients) => {
            return prevPatients.map((patient) => {
              if (patient.patient_id === patientId) {
                return { ...patient, patient_status: "ADMISSION" };
              }
              return patient;
            });
          });
          closeModal();
          close();
        }
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
            <div className="w-[58rem]">
              <DropDownInput
                onChange={ChangeEmergencyRoom}
                values={Rooms}
                value={emergencyRoom}
              />
            </div>
          </div>
        )}
        {emergencyRoom !== "" && Numbers && (
          <div className="flex items-center justify-between gap-[2rem]">
            <div>병상번호</div>
            <div className="w-[58rem]">
              <DropDownInput
                onChange={ChangeRoomNumber}
                values={Numbers}
                value={roomNumber}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
