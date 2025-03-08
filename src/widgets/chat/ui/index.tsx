import { Message } from "./Message";
import {
  useMessageList,
  type MessageItem,
} from "@/entities/chat-message-list";
import { timeStamp } from "@/shared/lib/time-stamp";
import { useEffect, useState } from "react";

const Chat = (props: ChatProps) => {
  const { nickName, roomName } = props;
  const _tempDate = new Date();
  const message = useMessageList();
  const [mergeList, setMergeList] = useState<(MessageItem)[]>([]);

  useEffect(() => {
    if (message) {
      setMergeList([...mergeList, message]);
    }


  }, [message]);

  return (
    <div className="tw:h-full tw:p-4 tw:flex tw:flex-col tw:gap-4">
      <div className="tw:overflow-y-scroll tw:grow tw:text-service-gray tw:flex tw:flex-col tw:gap-2">
        {/* 입장알람 */}
        {nickName && roomName ? (
          <>
            <div className="card tw: tw:text-center">
              <p>{`${nickName} 환영합니다.`}</p>
              <p>{`${roomName} 에 입장하였습니다.`}</p>
              <p>{timeStamp(_tempDate)}</p>
            </div>
            <div className="card tw: tw:text-center">
              <p>{`"@방" 입력시 방의 정보를 확인할수 있습니다.`}</p>
            </div>
          </>
        ) : (
          <div className="card tw: tw:text-center">
            <p>익명의 상대와 1 : 1 대화를 시작합니다</p>
            <p>{timeStamp(_tempDate)}</p>
          </div>
        )}

        {/* 채팅내역 */}
        {mergeList.map((item) => {
          switch (item.type) {
            case "message":
              return <Message key={`m-${item.id}`} {...item} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Chat;

type ChatProps = {
  nickName?: string;
  roomName?: string;
};
