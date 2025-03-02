import Send from "@/shared/asset/send.svg?react";
import ChatOut from "@/shared/asset/out.svg?react";

const ChatInput = () => {
  return (
    <div className="tw:p-2 tw:border-1 tw:border-service-secondary tw:rounded-lg tw:flex tw:items-center tw:gap-3 tw:text-base">
      <textarea
        className="tw:grow tw:outline-none tw:resize-none tw:peer"
        placeholder="채팅 메세지를 입력해주세요"
        maxLength={100}
        rows={2}
        required
      />

        <Send className="tw:peer-invalid:fill-service-gray tw:fill-service-primary tw:size-5 tw:cursor-pointer tw:hover:fill-service-secondary" />
        <ChatOut className="tw:fill-service-gray tw:size-5 tw:cursor-pointer tw:hover:fill-service-secondary"/>
      </div>
  );
};

export default ChatInput;
