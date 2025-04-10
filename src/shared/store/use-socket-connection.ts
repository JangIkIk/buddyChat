// package
import { create } from "zustand";
import { io } from "socket.io-client";

type SocketConnectionState = {
  socket: GlobalSocket;
} & {};

type SocketConnectionAction = {
  socketAction: {
    connect: ( nameSpace:string) => void;
  };
} & {};

/**
 * @FileDesc
 * - 서버 이벤트 수신(연결성공, 연결실패)
 * - 서버 이벤트 송신(연결요청)
*/
const useSocketConnection = create<SocketConnectionState & SocketConnectionAction>((set) => ({
  socket: null,

  socketAction: {
    connect: (nameSpace) => {
      // socket 연결요청
      const newSocket = io(`${import.meta.env.VITE_WOCKET_API}${nameSpace}`, {
        // path: '/chat', // -> 로컬
        path: "", //-> 서버
        transports: ["websocket"],
      });

      // socket 연결 성공시
      newSocket.on("connect", () => {
        console.log("socketID:",newSocket.id)
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
