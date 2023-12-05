import Link from "next/link";
import NavMenu from "./navMenu";
import ProfileButton from "./profileButton";
import SimpleMenu from "./simpleMenu";

export default function LeftMenu() {
  return (
    <div className="absolute left-0 top-0 ml-[2rem] h-full w-[8rem] bg-bg">
      <div className="flex h-full flex-col justify-between pb-[2rem]">
        <div className="mt-[5.2rem]">
          <Link href={"/"}>
            <div className="h-[4rem] w-[8rem] rounded-3xl bg-white"></div>
          </Link>
          <div className="mt-[2rem] flex flex-col gap-[2rem]">
            <ProfileButton />
          </div>
          <div className="mt-[8rem] flex flex-col gap-[2rem]">
            <div className="h-[8rem] w-[8rem] cursor-pointer rounded-3xl bg-white"></div>
            <div className="h-[8rem] w-[8rem] cursor-pointer rounded-3xl bg-white"></div>
          </div>
        </div>
        <div className="flex flex-col gap-[2rem]">
          <SimpleMenu />
          <NavMenu />
        </div>
      </div>
    </div>
  );
}
