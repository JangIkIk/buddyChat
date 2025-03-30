// package
import { useEffect, useState } from "react";
// layer
import { randomMatch } from "@/entities/socket-random-match";
import { useSocketConnection } from "@/shared/store/use-socket-connection";
import { roomAlert } from '@/entities/socket-room-alert';
import { chatMessage } from "@/entities/socket-chat-message";
import { useMergeList } from '@/widgets/chat-content'

type Match = boolean | null;

type MatchOnEventsReturn = {
  match: Match,
  waiting: boolean,
  startMatch: () => void,
  cancelMatch: () => void,
};

/**
 * @fileoverview
 * - 서버 수신 핸들러 (매치시간 초과, 룸 알람, 채팅 메세지)
 * - 서버 송신 핸들러 (매치시작, 매치취소)
 */

const useMatchOnEvents = (): MatchOnEventsReturn => {

  const [match, setMatch] = useState<Match>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  const { socket } = useSocketConnection();
  const mergeAction = useMergeList( state => state.action)

  const { connectMatch, disconnectMatch, receiveMatchTimeout, removeListener: randomMatchRemove } = randomMatch(socket); 
  const { receiveRoomAlert, removeListener: roomAlertRemove } = roomAlert(socket);
  const { receiveChatMessage, removeListener } = chatMessage(socket);

  
  const startMatch = () => {
    connectMatch((res) => {
      if (res.status === 201) setWaiting(true);
    });
  };

  const cancelMatch = () => {
    setMatch(null);
    disconnectMatch((res) => {
      if (res.status === 204) setWaiting(false);
    });
  };

  useEffect(() => {
    if (!socket) return;
    startMatch();
    receiveMatchTimeout((res) => {
      switch (res.status) {
        case 408:
          setMatch(false);
          setWaiting(false);
          break;
        default:
          setMatch(null);
          setWaiting(false);
          console.warn("cannot find the receiveMatchResult status code");
      }
    });
    
    receiveRoomAlert((res)=>{
      switch(res.status){
        case 200:
          mergeAction.saveAlert(res.data)
          setMatch(true);
          break;
        case 204:
          mergeAction.saveAlert(res.data);
          mergeAction.checkRoom();
          break;
        case 206:
          break;
        default:
          console.warn("cannot find the reciveRoomAlert status code");
      }
    })

    receiveChatMessage((res) => {
      const { status, data } = res;
      switch (status) {
        case 201:
          mergeAction.saveChatMessage(data);
          break;
        default:
          console.warn("cannot find the receiveChatMessage status code");
      }
  });

    return () => {
      randomMatchRemove();
      roomAlertRemove();
      removeListener();
    }
  }, [socket]);

  return {
    match,
    waiting,
    startMatch,
    cancelMatch,
  };
};

export { useMatchOnEvents };
