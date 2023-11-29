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
    if (data) {
      const { result, is_success } = data;
      if (!is_success) return;

      if (result.is_login) {
        login();
        setAccessToken(result.access_token);
        updateUserData(result.employee);
      }
    }
  }, [data, updateUserData, login, setAccessToken]);

  return <>{isLoading ? <Spinner /> : isLogin ? children : <LoginBox />}</>;
}
