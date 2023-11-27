import { EMS_REQUEST_ER } from "@/constant";
import { Request, useRequestListStore } from "@/states/requestStore";
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

    // requestSocket.on(
    //   EMS_REQUEST_ER_RESPONSE,
    //   (newRequest: {
    //     emergency_center_id: string;
    //     request_status: Request["request_status"];
    //   }) => {
    //     const { emergency_center_id, request_status } = newRequest;
    //     console.log("ems-request-er-response");
    //     console.log(newRequest);
    //     console.log(emergency_center_id, request_status);
    //   }
    // );

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
  }, [requestSocket, router, setRequestList]);
  return { requestSocket };
};
