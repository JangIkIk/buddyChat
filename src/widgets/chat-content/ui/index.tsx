// slice
import ChatMessage from "./chat-message";
import { useMergeList } from "../../../shared/store/use-merge-list";
// layer
import { useSocketConnection } from "@/shared/store/use-socket-connection";

/**
 * @FileDesc
 * - MergeList type에 따른 UI 구분
 * - 
*/
const ChatContent = () => {
  const { socket } = useSocketConnection();
  const mergeList = useMergeList((state) => state.mergeList);
  return (
    <div className="tw:h-full tw:flex tw:flex-col tw:gap-5 tw:c-bg-theme-strong tw:overflow-y-scroll">
      {socket && mergeList.map((item, idx) => {
        switch (item.type) {
          // 채팅메세지
          case "message":
            return <ChatMessage key={idx} {...item} />;
          // 입장알람 (Ui컴포넌트 분리필요)
          case "join":
            return (
              <div
                key={idx}
                className="card tw:text-center tw:text-service-gray tw:p-2"
              >
                <p>익명의 상대와 1 : 1 대화를 시작합니다.</p>
                <p>{item.joinTime}</p>
              </div>
            );
          // 퇴장알람 (UI컴포넌트 분리필요)
          case "out":
            if(socket.id === item.socketId){
              break;
            }
            return (
              <div
                key={idx}
                className="card tw:text-center tw:text-service-gray tw:p-2"
              >
                {`${item.nickName ?? "상대방"}이 채팅방을 나갔습니다.`}
              </div>
            );
        }
      })}
    </div>
  );
};

export default ChatContent;
