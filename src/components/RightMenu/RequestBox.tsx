import { Card } from "../common/Card";

interface RequestProps {
  id: number;
  time: string;
  name: string;
  gender: string;
  age: number;
  place: string;
  symptom: string[];
}

export default function RequestBox({
  id,
  time,
  name,
  gender,
  age,
  place,
  symptom,
}: RequestProps) {
  return (
    <Card size="medium" dropShadow="xl">
      <div className="relative px-[2rem] py-[1.5rem] text-[1.8rem] font-[600]">
        <div className="mb-[1rem] flex justify-between">
          <p>{id}</p>
          <p className="text-red">{time}</p>
        </div>
        <div className="mb-[1rem] flex justify-between">
          <p>
            {name} / {gender} / {age}세
          </p>
          <p>{place}</p>
        </div>
        <div className="mt-[5rem]">
          <p>
            {symptom.map(
              (s, index) => `${s}${index !== symptom.length - 1 ? ", " : ""}`
            )}
          </p>
          <p>
            {symptom.map(
              (s, index) => `${s} ${index !== symptom.length - 1 ? "," : ""}`
            )}
          </p>
        </div>
      </div>
    </Card>
  );
}
