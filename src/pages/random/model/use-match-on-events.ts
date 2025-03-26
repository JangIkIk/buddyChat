import { useEffect, useState } from "react";
import { randomMatch } from "@/entities/socket-random-match";
import { useSocketConnection } from "@/shared/store/use-socket-connection";
import { roomAlert } from '@/entities/socket-room-alert';
import { useMergeList } from '@/widgets/chat-content'

const useMatchOnEvents = () => {
  // Socket
  const { socket } = useSocketConnection();

  // Match State
  const [match, setMatch] = useState<boolean | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  // Match API
  const { connectMatch, disconnectMatch, resultMatch, removeListener: randomMatchRemove } = randomMatch(socket); 
  const { receiveRoomAlert, removeListener: roomAlertRemove } = roomAlert(socket);

  // MergeList
  const saveAlert = useMergeList( state => state.action.saveAlert);

  // MatchStart
  const startHandler = () => {
    connectMatch((res) => {
      if (res.status === 201) setWaiting(true);
    });
  };

  // MatchCancel
  const cancelHandler = () => {
    setMatch(null);
    disconnectMatch((res) => {
      if (res.status === 204) setWaiting(false);
    });
  };

  useEffect(() => {
    if (!socket) return;
    // if socket is connected, start the match
    startHandler();

    // timeout API
    resultMatch((res) => {
      switch (res.status) {
        case 408:
          setMatch(false);
          setWaiting(false);
          break;
        default:
          setMatch(null);
          setWaiting(false);
          console.warn("cannot find the status code");
      }
    });

    // if match successfull, saveAlert
    receiveRoomAlert((res)=>{
      switch(res.status){
        case 200:
          saveAlert(res.data)
          setMatch(true);
          break;
        default:
          alert("채팅방 입장에 실패했습니다.");
          console.warn("cannot find the status code");
      }
    })

    return () => {
      randomMatchRemove();
      roomAlertRemove();
    }
  }, [socket]);

  return {
    match,
    waiting,
    startHandler,
    cancelHandler,
  };
};

export { useMatchOnEvents };
