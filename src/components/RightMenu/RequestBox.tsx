import { getStatusStyles } from "@/lib/utils/requestStyle";
import { transeformName } from "@/lib/utils/transeform";
import { RequestStatus } from "@/states/requestStore";
import { Card } from "../common/Card";
interface RequestProps {
  date: string;
  name: string;
  gender: "남" | "여";
  age: string;
  companyName: string;
  symptom: string;
  status: RequestStatus;
}

export default function RequestBox({
  date,
  name,
  gender,
  age,
  companyName,
  symptom,
  status,
}: RequestProps) {
  const reqeustDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - reqeustDate.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const isOneHourAgo = minutesDifference >= 60;
  const formattedTimeDifference = `${String(
    Math.floor(minutesDifference / 60)
  ).padStart(2, "0")}:${String(minutesDifference % 60).padStart(2, "0")}`;

  const styles = getStatusStyles(status);
  return (
    <Card size="medium" dropShadow="xl">
      <div
        className={`relative flex min-h-[19rem] min-w-[36rem] flex-col justify-between rounded-3xl px-[2rem] py-[1.5rem] text-medium font-[600]`}
      >
        <span
          className={`absolute left-[0.5rem] top-[0.5rem] bg-${styles.backgroundColor} h-[1rem] w-[1rem] rounded-full`}
        ></span>
        <div>
          <div className="mb-[1rem] flex">
            <p className={`${isOneHourAgo ? "text-black" : "text-red"}`}>
              {formattedTimeDifference}
            </p>
          </div>
          <div className="mb-[1rem] flex justify-between gap-[2rem]">
            <div className="flex-1">
              <p>
                {name} / {gender} / {age}
              </p>
            </div>
            <div className="flex-1">
              <p>{transeformName(companyName)}</p>
            </div>
          </div>
        </div>
        <div>{symptom}</div>
      </div>
    </Card>
  );
}
