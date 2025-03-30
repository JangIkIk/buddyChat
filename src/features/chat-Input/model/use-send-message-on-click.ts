// type
import { type RefObject } from "react";
// layer
import { chatMessage } from "@/entities/socket-chat-message";
import { chatMessageRegex } from "@/shared/consts/regex";
import { useSocketConnection } from '@/shared/store/use-socket-connection';

type SendMessageOnClickReturn = {
  clickHandler: () => void,
};

/**
 * @FileDesc
 * - 서버 송신 핸들러 (채팅 메세지)
 * -
*/
const useSendMessageOnClick = (
  chatRef: RefObject<HTMLTextAreaElement | null>
): SendMessageOnClickReturn => {
  const { socket } = useSocketConnection();
  const { sendChatMessage } = chatMessage(socket);

  const clickHandler = () => {
    if (!chatRef.current) return;

    if (chatMessageRegex(chatRef.current.value)) {
      sendChatMessage(chatRef.current.value, (res) => {
        switch (res.status) {
          case 200:
            if (chatRef.current) chatRef.current.value = "";
            break;
          default:
            alert("메세지를 전송할수가 없습니다.");
            console.warn("cannot find the sendChatMessage(Mouse) status code");
        }
      });
    }
  };

  return { clickHandler };
};

export { useSendMessageOnClick };
