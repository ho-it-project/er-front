import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import ManagementBox from "./managementBox";
import ManagementHeader from "./roomManagementHeader";

const topNavs = [{ title: "병동 구역 관리", link: "/roomManagement" }];

export default function RoomManagementContainer() {
  return (
    <TopNavContentWrapper topNav={{ items: topNavs }}>
      <div className="flex justify-end">
        <div className="flex h-[4rem] w-[20rem] items-center justify-center rounded-2xl bg-main text-regular font-regular text-white">
          구역 추가하기 +
        </div>
      </div>
      <div className="flex flex-col pl-[4rem]">
        <ManagementHeader />
        <ManagementBox />
      </div>
    </TopNavContentWrapper>
  );
}
