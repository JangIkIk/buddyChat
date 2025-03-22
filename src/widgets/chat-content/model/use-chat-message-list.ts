import { useEffect, useState } from "react";
import { useSocketConnection } from "@/shared/store/use-socket-connection";
import { useChatMessageSocket } from "@/entities/use-chat-message-socket";
import { messageWrap, type MessageMapperType } from "../lib/message-wrap";

const useChatMessageList = () => {
  const { socket } = useSocketConnection();
  const [messageList, setMessageList] = useState<MessageMapperType[]>([]);
  const { eventName, reciveChatMessage } = useChatMessageSocket();

  useEffect(() => {
    if (!socket) return;

    reciveChatMessage((res) => {
        const { status, data } = res;
        switch (status) {
          case 201:
            setMessageList(prev => [...messageWrap(prev, data)]);
            break;
          default:
            console.warn("cannot find the status code");
        }
    });

    return () => {
      socket.off(eventName, reciveChatMessage);
    }
  }, [socket]);

  return { messageList };
};

export { useChatMessageList, type MessageMapperType };
