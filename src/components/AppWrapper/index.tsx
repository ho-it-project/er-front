"use client";

import useLoginStore from "@/states/loginStore";
import React from "react";
import LoginBox from "../LoginBox";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin } = useLoginStore();
  return <>{isLogin ? children : <LoginBox />}</>;
}
