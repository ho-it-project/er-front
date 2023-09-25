import Link from "next/link";
import BottomMiniBox from "./bottomMiniBox";
import TopMiniBox from "./topMiniBox";

export default function Menu() {
  return (
    <div className="ml-[2rem] mr-[1rem] mt-[5rem] h-[104rem] w-[8rem]">
      <div className="mx-auto mt-5">
        <Link href={"/"}>
          <div className="h-[4rem] w-[8rem] rounded-3xl bg-white"></div>
        </Link>
        <div className="flex h-[96rem] flex-col justify-between">
          <TopMiniBox />
          <BottomMiniBox />
        </div>
      </div>
    </div>
  );
}
