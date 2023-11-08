"use client";

import useLoginStore from "@/states/loginStore";
import useUserStore from "@/states/userSore";
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
  const { data, isLoading } = useSWR(url, fetcher);
  const { updateUserData } = useUserStore();

  useEffect(() => {
    if (data && data.result.is_login) {
      login();
      updateUserData(data.result.employee);
    }
  }, [data, updateUserData, login]);

  return <>{isLogin ? children : isLoading ? <Spinner /> : <LoginBox />}</>;
}
