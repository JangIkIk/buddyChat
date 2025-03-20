import { RefObject } from "react";
import { useChatMessageSocket } from "@/entities/use-chat-message-socket";

const useSendMessageOnClick = (chatRef: RefObject<HTMLTextAreaElement | null>) => {
  const { sendChatMessage } = useChatMessageSocket();

  const clickHandler = () => {
    if (!chatRef.current) return;
    if (chatRef.current.value === "KEYWORD") return console.log("키워드전송");

    sendChatMessage(chatRef.current.value, (status) => {
      switch (status) {
        case 200:
          if (chatRef.current) chatRef.current.value = "";
          break;
        default:
          alert("메세지를 전송할수가 없습니다.");
          console.warn("cannot find the status code");
      }
    });
  };

  return { clickHandler };
};

export { useSendMessageOnClick }
