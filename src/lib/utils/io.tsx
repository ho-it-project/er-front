import { SOCKET_SERVER } from "@/constant";
import { io } from "socket.io-client";

export const IO = (uri: string, token: string | null) => {
  return io(`${SOCKET_SERVER}${uri}`, {
    transports: ["websocket"],
    auth: {
      token: token,
    },
  });
};
