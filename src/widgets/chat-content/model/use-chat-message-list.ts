import { useEffect } from "react";
import { useSocketConnection } from "@/shared/store/use-socket-connection";
import { chatMessage } from "@/entities/socket-chat-message";
import { useMergeList } from '../store/use-merge-list';

const useChatMessageList = () => {
  const { socket } = useSocketConnection();
  const saveChatMessage = useMergeList( state => state.action.saveChatMessage)
  const { receiveChatMessage, removeListener } = chatMessage(socket);

  useEffect(() => {
    if (!socket) return;

    receiveChatMessage((res) => {
        const { status, data } = res;
        switch (status) {
          case 201:
            saveChatMessage(data);
            break;
          default:
            console.warn("cannot find the status code");
        }
    });

    return () => {
      removeListener();
    }
  }, [socket]);

};

export { useChatMessageList };
