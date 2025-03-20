import { RefObject } from "react";
import { useChatSendMessage } from "@/entities/use-chat-send-message";

const useClickSendMessage = (chatRef: RefObject<HTMLTextAreaElement | null>) => {
  const { submitMessage } = useChatSendMessage();

  const clickHandler = () => {
    if (!chatRef.current) return;
    if (chatRef.current.value === "KEYWORD") return console.log("키워드전송");

    submitMessage(chatRef.current.value, (status) => {
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

export { useClickSendMessage }
