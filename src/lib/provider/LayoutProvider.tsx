"use client";

import { useRequestSocket } from "@/hooks/useRequestSocket";
import { useSocketStore } from "@/states/socketStore";
import useUserStore from "@/states/userStore";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { initSocket, resetSocket } = useSocketStore();
  const { accessToken } = useUserStore();

  // 소켓 핸들러
  useRequestSocket();

  // 소켓 초기화
  useEffect(() => {
    if (!accessToken) return;
    initSocket(accessToken);
    return () => {
      resetSocket();
    };
  }, [accessToken, initSocket, resetSocket]);

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default LayoutProvider;
