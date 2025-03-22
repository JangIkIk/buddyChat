import { useRef } from 'react';
import { useSendMessageOnEnter } from '../model/use-send-message-on-enter';
import { useSendMessageOnClick } from '../model/use-send-message-on-click';
import Send from "@/shared/asset/send.svg?react";

const ChatInput = () => {
  const chatRef = useRef<HTMLTextAreaElement>(null);
  const { enterHanlder } = useSendMessageOnEnter(chatRef);
  const { clickHandler } = useSendMessageOnClick(chatRef);
  return (
    <div className="tw:w-full card tw:p-2 tw:flex tw:items-center tw:gap-3 tw:text-base tw:relative">
      <textarea
        className="tw:grow tw:outline-none tw:resize-none tw:peer"
        placeholder="채팅 메세지를 입력해주세요"
        // problem: rows를 1이 아닌 다른값인경우 body태그의 연속적인 깜빡임 발생
        rows={1}
        ref={chatRef}
        required
        onKeyDown={enterHanlder}
      />
      <Send
        className="tw:peer-invalid:fill-service-gray tw:peer-invalid:cursor-not-allowed tw:fill-service-primary tw:size-5 tw:cursor-pointer"
        onClick={clickHandler}
      />
    </div>
  );
};

export default ChatInput;
