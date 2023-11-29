import { EMS_REQUEST_ER } from "@/constant";
import { Request, useRequestListStore } from "@/states/requestStore";
import { useSocketStore } from "@/states/socketStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const useRequestSocket = () => {
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

    requestSocket.on(EMS_REQUEST_ER, (data: Request) => {
      console.log("ems-request-er");
      console.log(data);
      setRequestList((prevReq) => {
        if (
          prevReq.some(
            (prev) => prev.emergency_center_id === data.emergency_center_id
          )
        ) {
          return prevReq;
        }
        return [...prevReq, data];
      });
    });
  }, [requestSocket, setRequestList]);
  return { requestSocket };
};
