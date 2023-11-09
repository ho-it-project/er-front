import Status from "@/components/common/Status";

interface HospitalInfoProps {
  name: string;
  sub: string;
  distance: string;
  number: string;
  location: string;
}

const DUMMYSTATUS = [
  { title: "일반", status: 12, full: 12, wait: 12 },
  { title: "코호트", status: 1, full: 2 },
  { title: "음압", status: 2, full: 4 },
  { title: "일반격리", status: 6, full: 8 },
  { title: "소아음압격리", status: 0, full: 2 },
  { title: "소아일반격리", status: 2, full: 2, wait: 12 },
  { title: "소아", status: 7, full: 8 },
];

export default function HospitalInfo({
  name,
  sub,
  distance,
  number,
  location,
}: HospitalInfoProps) {
  return (
    <div className="flex  w-full rounded-2xl border-2 border-main px-[3rem] py-[2rem] hover:bg-bg">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex flex-col">
          <span className="text-[2.4rem] font-bold">{name}</span>
          <span className="text-[1.5rem] font-medium">{sub}</span>
        </div>
        <div className="text-[2rem] font-semibold text-main">{distance}km</div>
      </div>
      <div className="flex h-full w-full min-w-[50rem] flex-col justify-center gap-[2rem]">
        <InfoItem text={number} />
        <InfoItem text={location} />
        <span className="flex w-full gap-[1rem]">
          {DUMMYSTATUS.map((s, index) => (
            <Status
              key={index}
              size="sm"
              title={s.title}
              status={s.status}
              full={s.full}
              wait={s.wait}
              view={false}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

interface InfoItemProps {
  text: string;
}

function InfoItem({ text }: InfoItemProps) {
  return (
    <div className="flex gap-[2rem] text-[1.5rem] font-medium">
      <div className="flex h-[2.4rem] min-w-[2.4rem] flex-wrap rounded-full bg-L-gray"></div>
      <div className="h-full">{text}</div>
    </div>
  );
}
