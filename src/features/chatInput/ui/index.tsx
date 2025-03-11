import { useChatEventHandler } from '../model/use-chat-event-handler';
import Send from "@/shared/asset/send.svg?react";
import ChatOut from "@/shared/asset/out.svg?react";
import { useAlarm } from '@/shared/store/modal-alarm';

const ChatInput = () => {
  const { errorMessage, chatRef, sendClickMessage, sendEnterMessage } = useChatEventHandler();
  const outModal = useAlarm(( state )=> state.toggleModal);
  return (
    <div className="tw:flex tw:items-center tw:gap-3 tw:text-base">
      <textarea
        className="tw:grow tw:outline-none tw:resize-none tw:peer card"
        placeholder="채팅 메세지를 입력해주세요"
        maxLength={100}
        rows={1}
        ref={chatRef}
        required
        onKeyDown={sendEnterMessage}
      />
      <Send
        className="tw:peer-invalid:fill-service-gray tw:peer-invalid:cursor-not-allowed tw:fill-service-primary tw:size-5 tw:cursor-pointer"
        onClick={sendClickMessage}
      />
      <ChatOut className="tw:fill-service-gray tw:size-5 tw:cursor-pointer tw:hover:fill-service-secondary" onClick={outModal}/>
    </div>
  );
};

export default ChatInput;
