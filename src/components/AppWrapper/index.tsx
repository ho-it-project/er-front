"use client";

import useLoginStore from "@/states/loginStore";
import React, { useEffect } from "react";
import LoginBox from "../LoginBox";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin, login } = useLoginStore();

  useEffect(() => {
    const url = "/api/er/auth";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.is_success) {
          login();
        }
      });
  }, [login]);

  return <>{isLogin ? children : <LoginBox />}</>;
}
