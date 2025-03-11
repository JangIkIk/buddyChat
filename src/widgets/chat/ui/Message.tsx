import { cn } from "@/shared/lib/cn";
import { type MessageItem } from '@/entities/chat-message-list';
import { timeStamp } from "@/shared/lib/time-stamp";

const Message = (props: MessageItem) => {
  const { isMine, nickName, message, date } = props;
  return (
    <div>
      {!isMine && <span>{nickName ?? "상대방"}</span>}
      <div className={cn('tw:flex tw:items-center tw:gap-1',{
        "tw:flex-row-reverse": isMine
      }

      )}>
        <p className="tw:bg-service-secondary tw:text-white tw:p-2 tw:rounded-lg tw:whitespace-pre-wrap">
          {message}
        </p>
        <span className="tw:text-sm tw:self-end">{timeStamp(date, "HH:mm")}</span>
      </div>
    </div>
  );
};

export { Message };