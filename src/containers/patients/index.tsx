"use client";

import Spinner from "@/components/Spinner";
import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import useUserStore from "@/states/userStore";
import useSWR from "swr";

const topNavs = [{ title: "환자 리스트", link: "/patients" }];

export default function PatientsContainer() {
  const { accessToken } = useUserStore();

  const url = "/api/er/patients";
  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());

  const { data, isLoading } = useSWR(url, (url: string) =>
    fetcher(url, accessToken)
  );

  console.log("환자 리스트", data);

  return (
    <TopNavContentWrapper topNav={{ items: topNavs }}>
      {isLoading ? <Spinner /> : <div>환자리스트</div>}
    </TopNavContentWrapper>
  );
}
