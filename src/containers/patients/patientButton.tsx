import { ERPatientStatus } from "@/states/patientsStore";
import { useRouter } from "next/navigation";

interface PatientButtonProps {
  patientStatus: ERPatientStatus;
  bedAssignmentHandler: () => void;
}

export default function PatientButton({
  patientStatus,
  bedAssignmentHandler,
}: PatientButtonProps) {
  const router = useRouter();
  let button;

  switch (patientStatus) {
    case "PENDING":
      button = (
        <button
          className="flex h-[7rem] w-[36rem] cursor-pointer items-center justify-center rounded-3xl bg-main30"
          onClick={() => bedAssignmentHandler}
        >
          병상배치하기
        </button>
      );
      break;

    case "ADMISSION":
      button = (
        <button
          className="flex h-[7rem] w-[36rem] cursor-pointer items-center justify-center rounded-3xl bg-L-gray"
          onClick={() => {
            router.push("/");
          }}
        >
          병상정보확인하기
        </button>
      );
      break;

    default:
      button = (
        <button className="flex h-[7rem] w-[36rem] cursor-pointer items-center justify-center rounded-3xl bg-main30">
          안뇽
        </button>
      );
      break;
  }

  return (
    <div className="flex justify-end px-[2rem] py-[3rem] text-[1.8rem] font-[500] text-white">
      {button}
    </div>
  );
}
