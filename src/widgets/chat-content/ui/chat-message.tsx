// package
import { memo } from "react";
// layer
import { type ChatMessageMapper} from "@/entities/socket-chat-message";
import { cn } from "@/shared/lib/cn";
import { timeStamp } from "@/shared/lib/time-stamp";
import { useSocketConnection } from "@/shared/store/use-socket-connection";


/**
 * @FileDesc
 * - 채팅메세지 UI (닉네임, 시간, 내용)
 * - 
*/
const ChatMessage = (props: ChatMessageMapper) => {
  const { chatMessageList, chatTime, sender, nickName } = props;
  const { socket } = useSocketConnection();
  const isSender:boolean | null = socket && socket.id === sender;
  return (
    <div className="tw:text-service-gray">
      {/* 송신자 본인은 닉네임을 숨김 */}
      {!isSender && <span>{nickName ?? "상대방"}</span>}
        <ul
          className={cn("tw:flex tw:flex-col tw:gap-1 tw:items-start", {
            // 송신자 본인은 오른쪽배치
            "tw:items-end": isSender,
          })}
        >
          {chatMessageList.map((message, idx , array) => {
            return (
              <li key={idx} className={cn('tw:flex tw:gap-1',{
                // 송신자 본인은 메세지와 시간의 위치를 변경
                "tw:flex-row-reverse": isSender
              })}>
                <span className="tw:bg-service-secondary tw:text-white tw:py-2 tw:px-3 tw:rounded-lg tw:whitespace-pre-wrap">{message}</span>
                {/* 마지막리스트 시간표시 */}
                {array.length - 1 === idx && <span className="tw:text-sm tw:self-end">{timeStamp(chatTime, "HH:mm")}</span>}
              </li>
            );
          })}
        </ul>
    </div>
  );
};

export default memo(ChatMessage);
