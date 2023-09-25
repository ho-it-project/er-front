import Board from "@/components/board/page";
import ScrollContainer from "@/containers/home/scrollContainer";

export default function Home() {
  return (
    <Board>
      <div>
        <span className="absolute -top-[4rem] flex h-[5rem] w-[26rem] items-center rounded-2xl bg-white">
          <span className="ml-[3rem] text-[1.8rem] font-[700] text-main">
            B1 응급병동
          </span>
        </span>
        <span className="absolute -top-[4rem] left-[30rem] flex h-[5rem] w-[26rem] items-center rounded-2xl bg-white opacity-70">
          <span className="ml-[3rem] text-[1.8rem] font-[700] text-main">
            B1 음압병동
          </span>
        </span>
        <span className="absolute -top-[4rem] left-[60rem] flex h-[5rem] w-[26rem] items-center rounded-2xl bg-white opacity-70">
          <span className="ml-[3rem] text-[1.8rem] font-[700] text-main">
            1F 소아응급병동
          </span>
        </span>
        <span className="absolute -top-[4rem] left-[90rem] flex h-[5rem] w-[26rem] items-center rounded-2xl bg-white opacity-70">
          <span className="ml-[3rem] text-[1.8rem] font-[700] text-main">
            B1 중증응급병동
          </span>
        </span>
        <ScrollContainer />
      </div>
    </Board>
  );
}
