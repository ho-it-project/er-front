import { RequestStatus } from "@/states/requestStore";
import RequestStatusView from "./requestStatusView";

interface ItemProps {
  requestDate: string;
  gender: "남" | "여";
  age: string;
  companyName: string;
  symptom: string;
  status: RequestStatus;
}

export default function RequestItem({
  requestDate,
  gender,
  age,
  companyName,
  symptom,
  status,
}: ItemProps) {
  return (
    <div className="flex h-[8.5rem] w-full items-center justify-between border-b-2 border-L-gray pl-[4rem] text-[1.8rem] font-[700]">
      <span className="w-1/5 min-w-[15rem]">{requestDate}</span>
      <span className="w-1/5 min-w-[15rem]">
        {gender} / {age}
      </span>
      <span className="w-2/5 min-w-[15rem]">{companyName}</span>
      <span className="w-1/5 min-w-[15rem]">{symptom}</span>
      <span className="flex w-full justify-end">
        <RequestStatusView status={status} />
      </span>
    </div>
  );
}
