// package
import { useEffect, useState } from "react";
// layer
import { randomMatch } from "@/entities/socket-random-match";
import { useSocketConnection } from "@/shared/store/use-socket-connection";
import { roomAlert } from '@/entities/socket-room-alert';
import { chatMessage } from "@/entities/socket-chat-message";
import { useMergeList } from '@/shared/store/use-merge-list'

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
  const mergeAction = useMergeList( state => state.action);
  const isRoom = useMergeList((state) => state.isRoom);

  const { connectMatch, disconnectMatch, receiveMatchTimeout, removeListener: randomMatchRemove } = randomMatch(socket); 
  const { receiveRoomAlert, removeListener: roomAlertRemove } = roomAlert(socket);
  const { receiveChatMessage, removeListener } = chatMessage(socket);

  
  const startMatch = () => {
    connectMatch((res) => {
      if (res.status === 201) {
        setWaiting(true); 
        setMatch(false);
      }
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
    // 페이지 이동시에 socket이 안끊어지므로 랜덤채팅페이지 다시넘어오면 매치가 자동으로 발생
    // socket끊는것을 고민해보자
    startMatch();

    receiveMatchTimeout((res) => {
      const { data } = res;
      switch(data.type){
        case "timeout":
          setMatch(false);
          setWaiting(false);
          break;
        default:
          console.warn("cannot find the receiveMatchTimeout type");
      }
    });
    
    receiveRoomAlert((res)=>{
      const { data } = res;
      switch(data.type){
        case "join":
          if(!isRoom) mergeAction.reSet();
          mergeAction.checkRoom();
          mergeAction.saveAlert(data);
          setMatch(true);
          break;
        case "out":
          mergeAction.saveAlert(data);
          mergeAction.checkRoom();
          break;
        case "midnight":
          // 자정 시간 형식 대기
          break;
        default:
          console.warn("cannot find the reciveRoomAlert type");
      }
    });

    receiveChatMessage((res) => {
      const { data } = res;
      switch (data.type) {
        case "message":
          mergeAction.saveChatMessage(data);
          break;
        default:
          console.warn("cannot find the receiveChatMessage type");
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
