import { useEffect, useState } from "react";
import { useRandomMatchSocket } from '@/entities/use-random-match-socket';

const useMatchOnEvents = () => {
  const [match, setMatch] = useState<boolean | null>(null);
  const [matchTime, setMatchTime] = useState("");
  const [waiting, setWaiting] = useState<boolean>(false);
  const { socket, connectMatch, disconnectMatch, matcResult } = useRandomMatchSocket();

  const startHandler = () => {
    connectMatch((status) => {
        if(status === 201) setWaiting(true);
    })
  };

  const cancelHandler = () => {
    setMatch(null);
    disconnectMatch((status)=>{
        if(status === 204) setWaiting(false);
    })
  };

  useEffect(() => {
    
    if (!matcResult.status) return;
    switch(matcResult.status){
        case 200: // 매치성공
            setMatch(true);
            setMatchTime(matchTime)
        break;
        case 408: // 매치시간초과
            setMatch(false);
            setWaiting(false);
        break;
        default: // 상태코드 예외처리
            setMatch(null);
            setWaiting(false);
            alert("서버문제로 현재는 이용할수가 없습니다.");
            console.warn("cannot find the status code");
    }

  }, [matcResult]);

  useEffect(()=>{
    if(!socket) return;
    startHandler();

  },[socket])

  return {
    match,
    matchTime,
    waiting,
    startHandler,
    cancelHandler,
  };
};

export { useMatchOnEvents };
