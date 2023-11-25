"use client";

import useLoginStore from "@/states/loginStore";
import useUserStore from "@/states/userStore";
import React, { useEffect } from "react";
import useSWR from "swr";
import LoginBox from "../LoginBox";
import Spinner from "../Spinner";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin, login } = useLoginStore();

  const url = "/api/er/auth";
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { setAccessToken, updateUserData } = useUserStore();
  const { data, isLoading } = useSWR(url, fetcher);

  useEffect(() => {
    if (data && data.result.is_login) {
      login();
      setAccessToken(data.result.access_token);
      updateUserData(data.result.employee);
    }
  }, [data, updateUserData, login, setAccessToken]);

  return <>{isLogin ? children : isLoading ? <Spinner /> : <LoginBox />}</>;
}
