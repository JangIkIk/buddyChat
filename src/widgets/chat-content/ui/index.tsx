import ChatMessage  from "./chat-message";
import { useChatMessageList } from '../model/use-chat-message-list';
import { timeStamp } from "@/shared/lib/time-stamp";


type ChatContentProps = {
  matchTime?: string;
  matchStartAlert: string;
}

const ChatContent = (props: ChatContentProps) => {
  const { matchTime, matchStartAlert } = props;
  const { messageList } = useChatMessageList();

  return (
    <div className="tw:h-full tw:flex tw:flex-col tw:gap-5 tw:c-bg-theme-strong tw:overflow-y-scroll">
        {matchTime && matchStartAlert && ( // 입장알람
          <div className="card tw:text-center tw:text-service-gray">
            <p>{matchStartAlert}</p>
            {matchTime && <p>{matchTime}</p>}
          </div>
        )}
        
        {messageList.map((item, idx) => { // 채팅리스트
          return <ChatMessage key={idx} {...item} />;
        })}
    </div>
  );
};

export default ChatContent;
