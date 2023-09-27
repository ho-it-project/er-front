import Link from "next/link";
import BottomMiniBox from "./BottomMiniBox";
import TopMiniBox from "./TopMiniBox";

export default function Menu() {
  return (
    <div className="ml-[2rem] w-[8rem]">
      <div className="flex h-full flex-col justify-between pb-[2rem]">
        <div className="mt-[5.2rem]">
          <Link href={"/"}>
            <div className="h-[4rem] w-[8rem] rounded-3xl bg-white"></div>
          </Link>
          <div className="mt-[2rem]">
            <TopMiniBox />
          </div>
        </div>
        <BottomMiniBox />
      </div>
    </div>
  );
}
