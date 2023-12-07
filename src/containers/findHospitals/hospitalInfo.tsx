interface RoomInfo {
  name: string;
  color: string;
}

interface HospitalInfoProps {
  name: string;
  sub: string;
  distance: string;
  number: string;
  location: string;
  roomInfo: RoomInfo[];
}

export default function HospitalInfo({
  name,
  sub,
  distance,
  number,
  location,
  roomInfo,
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
          {roomInfo.map((info, index) => (
            <div
              key={index}
              className={`text-${info.color} border-2 text-small font-medium border-${info.color} rounded-3xl px-[1rem] py-[0.2rem]`}
            >
              {info.name}
            </div>
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
