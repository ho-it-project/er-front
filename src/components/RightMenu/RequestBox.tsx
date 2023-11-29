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
  return (
    <Card size="medium" dropShadow="xl">
      <div className="relative flex min-h-[19rem] min-w-[38rem] flex-wrap px-[2rem] py-[1.5rem] text-[1.8rem] font-[600]">
        <div className="mb-[1rem] flex justify-between">
          <p className="text-red">{date}</p>
        </div>
        <div className="mb-[1rem] justify-between">
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
