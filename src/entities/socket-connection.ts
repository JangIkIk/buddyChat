import { create } from "zustand";
import { io, Socket } from "socket.io-client";

const useSocketConnection = create<SocketConnectionState & SocketConnectionAction>((set) => ({
  socket: null,

  socketAction: {
    connect: () => {
      const newSocket = io(`${import.meta.env.VITE_TEST_WOCKET_URL}`, {
        transports: ["websocket"],
      });

      newSocket.on("connect", () => {
        set({ socket: newSocket });
      });

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
    connect: () => void;
  };
} & {};