import { Message } from "./Message";
import { timeStamp } from "@/shared/lib/time-stamp";
import { ChatInput } from "@/features/chatInput";

const Chat = () => {
  const _tempDate = new Date();
  return (
    <div className="tw:h-full tw:p-4 tw:flex tw:flex-col tw:gap-4">
      <div className="tw:overflow-y-scroll tw:grow tw:text-service-gray tw:flex tw:flex-col tw:gap-2">
        <div className="card">
          <p>익명의 상대와 1 : 1 대화를 시작합니다</p>
          <p>{timeStamp(_tempDate)}</p>
        </div>

        <Message time={timeStamp(_tempDate, "HH-mm")}>안녕하세요</Message>
        <Message time={timeStamp(_tempDate, "HH-mm")} isMine={true}>
          안녕하세요
        </Message>
      </div>
      <p className="tw:after:content-['.'] tw:after:animate-dotPing">
        상대방이 입력중입니다
      </p>

      <ChatInput />
    </div>
  );
};

export default Chat;
