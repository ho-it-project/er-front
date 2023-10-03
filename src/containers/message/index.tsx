import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import RequestPlaceBox from "../../components/common/PlaceBox";
import MessageContentWrapper from "../../components/common/ContentWrapper";
import MessageBox from "./messageBox";
import PlaceBox from "../../components/common/PlaceBox";
import ContentWrapper from "../../components/common/ContentWrapper";

const topNavs = [{ title: "메세지", link: "message" }];

export default function MessageContainer() {
  return (
    <>
      <TopNavContentWrapper topNav={{ items: topNavs }}>
        <div className="flex min-w-[40rem] justify-between text-[1.5rem] text-L-gray">
          <div>대화창</div>
          <div className="text-[3rem]">+</div>
        </div>
        <div className="flex flex-col gap-[1.5rem] px-[1.5rem]">
          <MessageBox />
          <MessageBox />
          <MessageBox />
        </div>
      </TopNavContentWrapper>
      <div className="mt-[7rem] flex h-[calc(100%-9rem)] min-w-[98rem] flex-col">
        <PlaceBox place="광진소방서" />
        <div className="flex h-full w-full justify-between gap-[2rem] overflow-hidden">
          <div className="h-full w-2/3">
            <ContentWrapper>
              <input className="absolute bottom-[2rem] h-[5.5rem] w-[56rem] rounded-full border-2 border-main bg-white" />
            </ContentWrapper>
          </div>
          <div className="h-full w-1/3">
            <ContentWrapper>
              <div className="h-[18.6rem] w-[26rem] bg-bg"></div>
            </ContentWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
