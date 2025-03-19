import { useEffect, useState } from "react";
import { useSocketConnection } from "@/shared/store/use-socket-connection";

const useMatchEventHandler = () => {
  const { socket, socketAction } = useSocketConnection();
  const [match, setMatch] = useState<boolean | null>(null);
  const [matchTime, setMatchTime] = useState("");
  const [waiting, setWaiting] = useState<boolean>(false);
  const matchStart = () => socketAction.connect("/random");

  const matchConnect = () => {
    if (!socket) return;
    socket.emit("match-start", ( res: {status: number} ) => {
      const {status} = res;
      if(status === 201) setWaiting(true);
    });
  };

  const matchDisConnect = () => {
    if (!socket) return;
    setMatch(null);
    socket.emit("match-cancel", ( res: {status: number}) => {
      const {status} = res;
      if(status === 204) setWaiting(false);
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("match", (data: { status: number, matchTime:string}) => {
      const { status, matchTime } = data;
      switch (status) {
        case 200: // 매치성공
          setMatch(true);
          setMatchTime(matchTime)
          break;
        case 408: // 매치 대기시간 초과
          setMatch(false);
          setWaiting(false);
          break;
        default: // 상태코드 예외처리
        setMatch(null);
        setWaiting(false);
        alert("서버문제로 현재는 이용할수가 없습니다.");
        console.warn("cannot find the status code");
      }      
    });

    matchConnect();
    return () => {
      socket.off("match")
    };
  }, [socket]);

  return {
    match,
    matchTime,
    waiting,
    matchStart,
    matchConnect,
    matchDisConnect,
  };
};

export { useMatchEventHandler };
