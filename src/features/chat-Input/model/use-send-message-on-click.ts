import { RefObject } from "react";
import { chatMessage } from "@/entities/socket-chat-message";
import { chatMessageRegex } from "@/shared/consts/regex";
import { useSocketConnection } from '@/shared/store/use-socket-connection';

const useSendMessageOnClick = (
  chatRef: RefObject<HTMLTextAreaElement | null>
) => {
  const { socket } = useSocketConnection();
  const { sendChatMessage } = chatMessage(socket);

  const clickHandler = () => {
    if (!chatRef.current) return;
    if (chatRef.current.value === "KEYWORD") return console.log("키워드전송");

    if (chatMessageRegex(chatRef.current.value)) {
      sendChatMessage(chatRef.current.value, (res) => {
        switch (res.status) {
          case 200:
            if (chatRef.current) chatRef.current.value = "";
            break;
          default:
            alert("메세지를 전송할수가 없습니다.");
            console.warn("cannot find the status code");
        }
      });
    }
  };

  return { clickHandler };
};

export { useSendMessageOnClick };
