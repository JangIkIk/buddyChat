import { useChatMessage } from '../model/use-chat-message';
import Send from "@/shared/asset/send.svg?react";
import ChatOut from "@/shared/asset/out.svg?react";
import { useAlarm } from '@/shared/store/modal-alarm';

const ChatInput = () => {
  const { chatRef, sendClickMessage, sendEnterMessage } = useChatMessage();
  const outModal = useAlarm(( state )=> state.toggleModal);
  return (
    <div className="tw:flex tw:items-center tw:gap-3 tw:text-base">
      <textarea
        className="tw:grow tw:outline-none tw:resize-none tw:peer tw:border-1 tw:border-service-secondary tw:rounded-lg tw:p-2 "
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
