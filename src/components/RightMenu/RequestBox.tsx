import { Card } from "../common/Card";

interface RequestProps {
  date: string;
  name: string;
  gender: "남" | "여";
  age: string;
  companyName: string;
  symptom: string;
}

export default function RequestBox({
  date,
  name,
  gender,
  age,
  companyName,
  symptom,
}: RequestProps) {
  const reqeustDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - reqeustDate.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const isOneHourAgo = minutesDifference >= 60;
  const formattedTimeDifference = `${String(
    Math.floor(minutesDifference / 60)
  ).padStart(2, "0")}:${String(minutesDifference % 60).padStart(2, "0")}`;
  return (
    <Card size="medium" dropShadow="xl">
      <div className="relative flex min-h-[19rem] min-w-[38rem] flex-wrap px-[2rem] py-[1.5rem] text-[1.8rem] font-[600]">
        <div className="mb-[1rem] flex">
          <p className={`${isOneHourAgo ? "text-black" : "text-red"}`}>
            {formattedTimeDifference}
          </p>
        </div>
        <div className="mb-[1rem] flex flex-col justify-between">
          <p>
            {name} / {gender} / {age}
          </p>
          <p>{companyName}</p>
        </div>
        <div>{symptom}</div>
      </div>
    </Card>
  );
}
