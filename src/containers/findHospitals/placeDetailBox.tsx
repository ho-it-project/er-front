import Status from "@/components/common/Status";

interface PlaceDetailBoxProps {
  sub: string;
  number: string;
  location: string;
}

const DUMMY_STATUSES = [
  [
    { title: "일반", status: 12, full: 12, wait: 12 },
    { title: "코호트", status: 1, full: 2 },
    { title: "음압", status: 2, full: 4 },
    { title: "일반격리", status: 6, full: 8 },
  ],
  [
    { title: "소아음압격리", status: 0, full: 2 },
    { title: "소아일반격리", status: 2, full: 2, wait: 12 },
    { title: "소아", status: 7, full: 8 },
  ],
];

const DUMMY_OPTIONS = [
  {
    main: { title: "재관류중재술", treat: true },
    contents: [
      { subTitle: "뇌경색", treatment: false },
      { subTitle: "심근경색", treatment: true },
    ],
  },
  {
    main: { title: "뇌출혈수술", treat: true },
    contents: [
      { subTitle: "거미막하출혈", treatment: true },
      { subTitle: "거미막하출혈외", treatment: true },
    ],
  },
  {
    main: { title: "대동맥응급", treat: true },
    contents: [
      { subTitle: "흉부", treatment: true },
      { subTitle: "복부", treatment: false },
    ],
  },
  {
    main: { title: "담낭담관질환", treat: true },
    contents: [
      { subTitle: "담낭질환", treatment: true },
      { subTitle: "담도포함질환", treatment: true },
    ],
  },
  {
    main: { title: "복부응급수술", treat: false },
    contents: [{ subTitle: "비와상", treatment: false }],
  },
  {
    main: { title: "장중첩/폐색", treat: true },
    contents: [{ subTitle: "영유아", treatment: true }],
  },
  {
    main: { title: "사지접합", treat: true },
    contents: [
      { subTitle: "수족지접합", treatment: true },
      { subTitle: "수족지접합 외", treatment: false },
    ],
  },
];

export default function PlaceDetailBox({
  sub,
  number,
  location,
}: PlaceDetailBoxProps) {
  return (
    <div className="flex flex-col">
      <div className="h-[18.6rem] w-full bg-bg"></div>
      <div className="mt-[2rem] flex h-full w-full flex-col justify-center">
        <div className="flex h-full w-full flex-col justify-center gap-[2rem] border-b-2 border-L-gray py-[2rem]">
          <InfoItem text={sub} />
          <InfoItem text={number} />
          <InfoItem text={location} />
        </div>
        <BedInfo />
        <EmergencyTreatmentOptions />
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
      <span className="h-[2.4rem] w-[2.4rem] rounded-full bg-L-gray"></span>
      {text}
    </div>
  );
}

function BedInfo() {
  return (
    <div className="flex h-full w-full flex-col justify-center border-b-2 border-L-gray pb-[4rem] pt-[2rem]">
      <span className="text-semibold pb-[1rem] text-[1.5rem] text-L-gray">
        병상정보
      </span>
      <div className="flex justify-around">
        {DUMMY_STATUSES[0].map((i, index) => (
          <Status
            key={index}
            size="sm"
            title={i.title}
            status={i.status}
            full={i.full}
            wait={i.wait}
          />
        ))}
      </div>
      <div className="mt-[3rem] flex justify-around">
        {DUMMY_STATUSES[1].map((i, index) => (
          <Status
            key={index}
            size="sm"
            title={i.title}
            status={i.status}
            full={i.full}
            wait={i.wait}
          />
        ))}
      </div>
    </div>
  );
}

interface Content {
  subTitle: string;
  treatment: boolean;
}

interface EmergencyInfoProps {
  title: string;
  treat: boolean;
  contents: Content[];
}

function EmergencyInfo({ title, treat, contents }: EmergencyInfoProps) {
  return (
    <div className="flex w-full">
      <span
        className={`w-1/2 text-[1.5rem] font-[600] ${
          treat ? "text-main" : "text-L-gray"
        }`}
      >
        {title}
      </span>
      <div className="flex w-1/2 items-center">
        {contents.map((c, index) => (
          <span
            key={index}
            className={`${c.treatment ? "text-black" : "text-L-gray"}`}
          >
            {c.subTitle}
            {index !== contents.length - 1 ? "-" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function EmergencyTreatmentOptions() {
  return (
    <div className="flex h-full w-full flex-col justify-center pt-[2rem]">
      <span className="text-semibold pb-[1rem] text-[1.5rem] text-L-gray">
        치료 가능 중증응급질환
      </span>
      <div className="flex h-[27rem] flex-col justify-between">
        {DUMMY_OPTIONS.map((i, index) => (
          <EmergencyInfo
            key={index}
            title={i.main.title}
            treat={i.main.treat}
            contents={i.contents}
          />
        ))}
      </div>
    </div>
  );
}
