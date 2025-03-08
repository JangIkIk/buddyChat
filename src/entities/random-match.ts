import { create } from "zustand";

const useRandomMatch = create<RandomMatchState & RandomMatchAction>(
  (set, get) => ({
    waiting: false,
    match: false,
    timeout: false,
    connectedSocket: null,

    matchAction: {
      setSocket: (connectedSocket) => set({ connectedSocket }),

      start: () => {
        try {
          const { connectedSocket } = get();
          if (!connectedSocket) return;
          
          connectedSocket.emit("match-start", (res: { status: number }) => {
            const { status } = res;
            if (status === 204) {
              set({ waiting: true });
            }
          });

          connectedSocket.on("match-timeout", (res: { status: number }) => {
            if (res.status === 404) {
              set({ waiting: false, timeout: true });
            }
          });

          connectedSocket.on("match", (res: { status: number }) => {
            if (res.status === 200) {
              set({ waiting: false, timeout: false, match: true });
            }
          });
        } catch (error) {
          console.log("start에러:", error);
        }
      },

      end: () => {
        try {
          const { connectedSocket } = get();
          if (!connectedSocket) return;
          connectedSocket.emit("match-end", (res: { status: number }) => {
            const { status } = res;
            if (status === 204) {
              set({ match: false, timeout: false, waiting: false });
            }
          });
        } catch (error) {
          console.log("end에러:", error);
        }
      },
    },
  })
);

export { useRandomMatch };

type RandomMatchState = {
  waiting: boolean;
  match: boolean;
  timeout: boolean;
  connectedSocket: GlobalSocket | null;
} & {};

type RandomMatchAction = {
  matchAction: {
    setSocket: (socket: GlobalSocket) => void;
    start: () => void;
    end: () => void;
  };
} & {};
