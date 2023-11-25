import { useRequestListStore } from "@/states/requestStore";
import { useSocketStore } from "@/states/socketStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const useRequestSocket = () => {
  const router = useRouter();
  const setRequestList = useRequestListStore(
    useShallow((state) => state.setRequests)
  );

  const requestSocket = useSocketStore(
    useShallow((state) => state.requestSocket)
  );
  useEffect(() => {
    if (!requestSocket) return;
    console.log("hi");

    requestSocket.on("connect", () => {
      console.log("socket connected");
    });

    // requestSocket.on(EMS_REQUEST_ER, () => {

    // });
  }, [requestSocket, router, setRequestList]);
  return { requestSocket };
};
