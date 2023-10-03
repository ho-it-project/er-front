import Status from "../common/Status";

const DUMMYSTATUS1 = [
  { title: "일반", status: 12, full: 12, wait: 12 },
  { title: "코호트", status: 1, full: 2 },
  { title: "음압", status: 2, full: 4 },
  { title: "일반격리", status: 6, full: 8 },
];

const DUMMYSTATUS2 = [
  { title: "소아음압격리", status: 0, full: 2 },
  { title: "소아일반격리", status: 2, full: 2, wait: 12 },
  { title: "소아", status: 7, full: 8 },
];

export default function StatusBox() {
  return (
    <div className="mb-[2rem] rounded-2xl bg-white px-[2rem] py-[3rem]">
      <div className="flex justify-around">
        {DUMMYSTATUS1.map((i, index) => (
          <Status
            key={index}
            title={i.title}
            status={i.status}
            full={i.full}
            wait={i.wait}
          />
        ))}
      </div>
      <div className="mt-[3.5rem] flex justify-around">
        {DUMMYSTATUS2.map((i, index) => (
          <Status
            key={index}
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
