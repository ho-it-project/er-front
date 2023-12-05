"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import useEmergencyCenterInfoStore from "@/states/EmergencyCenterInfoStore";
import useLoginStore from "@/states/loginStore";
import useUserStore from "@/states/userStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TopNavProfile = [{ title: "프로필", link: "/profile" }];
export default function ProfileContainter() {
  const router = useRouter();
  const { userData, accessToken } = useUserStore();
  const { emergencyCenterInfo } = useEmergencyCenterInfoStore();

  const Logouturl = "/api/er/auth/logout";

  const { logout } = useLoginStore();

  const handleLogout = () => {
    fetch(Logouturl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        logout();
        router.replace("/");
      });
  };

  return (
    <TopNavContentWrapper topNav={{ items: TopNavProfile }}>
      <div className="flex h-full w-full justify-around gap-[2rem] px-[16rem] py-[15rem]">
        <div className="flex flex-col gap-[7rem]">
          <div className="h-[28rem] w-[28rem] rounded-full bg-L-gray"></div>
          <div className="flex flex-col items-end gap-[2rem] text-medium font-medium text-main">
            <div className=" flex cursor-pointer gap-[1rem]">
              비밀번호 변경
              <Image
                src={"/fluent_ios-arrow-24-filled.png"}
                alt="화살표"
                width={18}
                height={18}
              />
            </div>
            <div
              className=" flex cursor-pointer justify-between gap-[1rem]"
              onClick={() => handleLogout()}
            >
              로그아웃
              <Image
                src={"/fluent_ios-arrow-24-filled.png"}
                alt="화살표"
                width={18}
                height={18}
              />
            </div>
          </div>
        </div>
        {userData && emergencyCenterInfo && (
          <div className="flex flex-col justify-between gap-[2rem]">
            <ProfileLine title="이름" value={userData.employee_name} />
            <ProfileLine
              title="기관명"
              value={emergencyCenterInfo.emergency_center_name}
            />
            <ProfileLine title="역할" value={userData.role} />
            <ProfileLine title="진료과" value={""} />
            <ProfileLine title="전문분야" value={""} />
            <ProfileLine title="ID" value={userData.id_card} />
          </div>
        )}
      </div>
    </TopNavContentWrapper>
  );
}

interface LineProps {
  title: string;
  value: string | null;
}
function ProfileLine({ title, value }: LineProps) {
  return (
    <div className="flex w-full items-center justify-between gap-[8rem] text-medium-L font-medium-L">
      <div className="min-w-[5rem] text-main">{title}</div>
      <div className="flex h-[10rem] min-w-[50rem] items-center rounded-2xl bg-bg pl-[3rem]">
        {value}
      </div>
    </div>
  );
}
