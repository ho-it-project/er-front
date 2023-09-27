import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import RequestPlaceBox from "./requestPlaceBox";
import MessageContentWrapper from "./messageContentWrapper";
import MessageBox from "./messageBox";

const topNavs = [{ title: "메세지" }];

export default function MessageContainer() {
  return (
    <>
      <TopNavContentWrapper topNav={{ items: topNavs }}>
        <div className="flex justify-between text-[1.5rem] text-L-gray">
          <div>대화창</div>
          <div className="text-[3rem]">+</div>
        </div>
        <div className="flex flex-col gap-[1.5rem] px-[1.5rem]">
          <MessageBox />
          <MessageBox />
          <MessageBox />
        </div>
      </TopNavContentWrapper>
      <div className="mt-[7rem] flex h-[calc(100%-7rem)] min-w-[98rem] flex-col">
        <RequestPlaceBox />
        <div className="flex h-full w-full justify-between gap-[2rem]">
          <div className="h-full w-2/3">
            <MessageContentWrapper>
              <div className="h-[5.5rem] w-[56rem] bg-bg"></div>
            </MessageContentWrapper>
          </div>
          <div className="h-full w-1/3">
            <MessageContentWrapper>
              <div className="h-[18.6rem] w-[26rem] bg-bg"></div>
            </MessageContentWrapper>
          </div>
          {/* <div className="my-[2rem] h-[88rem] w-[62rem] bg-white"></div>
        <div className="my-[2rem] ml-[2rem] h-[88rem] w-[32rem] bg-white"></div> */}
        </div>
      </div>
    </>
  );
}
