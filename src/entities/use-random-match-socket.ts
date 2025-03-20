import { useState, useEffect } from "react";
import { useSocketConnection } from "@/shared/store/use-socket-connection";

const useRandomMatchSocket = () => {
  const { socket } = useSocketConnection();
  const [matcResult, setMatchResult] = useState({
    status: 0,
    matchTime: ""
  });

  const connectMatch = (callback: (status: number) => void) => {
    if (!socket) return;
    socket.emit("match-start", (res: { status: number }) => {        
        callback(res.status);
    });
  };

  const disconnectMatch = (callback: (status: number) => void) => {
    if (!socket) return;
    socket.emit("match-cancel", (res: { status: number }) => {
      callback(res.status);
    });
  };


  useEffect(() => {
    if (!socket) return;
    socket.on("match", (res: { status: number; matchTime?: string}) => {
        if(res.matchTime){
            setMatchResult({status:res.status, matchTime:res.matchTime})
        }else{
            setMatchResult(prev => ({...prev, status:res.status}))
        }
    });

    return () => {
      socket.off("match");
    };
  }, [socket]);

  return { socket, connectMatch, disconnectMatch, matcResult };
};

export { useRandomMatchSocket };
