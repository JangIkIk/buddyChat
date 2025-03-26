import ChatMessage from "./chat-message";
import { useChatMessageList } from "../model/use-chat-message-list";

import { useMergeList } from "../store/use-merge-list";

const ChatContent = () => {
  useChatMessageList();
  const mergeList = useMergeList((state) => state.mergeList);

  return (
    <div className="tw:h-full tw:flex tw:flex-col tw:gap-5 tw:c-bg-theme-strong tw:overflow-y-scroll">
      {mergeList.map((item, idx) => {
        // 채팅리스트
        switch (item.type) {
          case "message":
            return <ChatMessage key={idx} {...item} />;
          case "join":
            return (
              // 랜덤채팅 및 그룹채팅 통합으로인한 ui변경예정
              <div key={idx} className="card tw:text-center tw:text-service-gray tw:p-2">
                <p>익명의 상대와 1 : 1 대화를 시작합니다.</p>
                <p>{item.joinTime}</p>
              </div>
            );
          case "out":
            // 랜덤채팅 및 그룹채팅 통합으로인한 ui변경예정
            return <div key={idx}>아웃알람</div>;
        }
      })}
    </div>
  );
};

export default ChatContent;
