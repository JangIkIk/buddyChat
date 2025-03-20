import { create } from "zustand";
import { io, Socket } from "socket.io-client";

const useSocketConnection = create<SocketConnectionState & SocketConnectionAction>((set) => ({
  socket: null,

  socketAction: {
    connect: (nameSpace) => {
      // socket 연결요청
      const newSocket = io(`${import.meta.env.VITE_WOCKET_API}${nameSpace}`, {
        path: '/chat',
        transports: ["websocket"],
      });

      // socket 연결 성공시
      newSocket.on("connect", () => {
        set({ socket: newSocket });
      });

      // socket 연결 실패시
      newSocket.on("connect_error", () => {
        set({ socket: null });
      });
    },
  },
}));

export { useSocketConnection };

type SocketConnectionState = {
  socket: Socket | null;
} & {};

type SocketConnectionAction = {
  socketAction: {
    connect: ( nameSpace:string ) => void;
  };
} & {};