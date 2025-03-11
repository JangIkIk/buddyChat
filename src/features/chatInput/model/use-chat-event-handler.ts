import { useRef, useState, type KeyboardEvent } from "react";
import { sendChatMessage } from "../api/send-chat-message";
import { useSocketConnection } from "@/entities/socket-connection";

const useChatEventHandler = () => {
  const { socket } = useSocketConnection();
  const chatRef = useRef<HTMLTextAreaElement>(null);
  const KEYWORD = "@방";
  const messageRegex = /^(?!\s*$).{1,100}$/s;
  const [ errorMessage, setErrorMessage] = useState<string>("");

  const sendClickMessage = () => {
    if (!chatRef.current || chatRef.current.value === "") return;
    if (chatRef.current.value === KEYWORD) return reciveKeyword();

    console.log("Click:", chatRef.current.value);
    chatRef.current.value = "";
  };

  // ___________

  const sendEnterMessage = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // chatRef.current or socket이 없을경우
    if (!chatRef.current || !socket) return;
    // 한글 조합형 입력방식으로인해, 한글을 조합중이라면
    if (event.nativeEvent.isComposing) return;
    // Enter로 줄바꿈을 방지하기위한 Enter + Shift 가아니라면 줄바꿈 방지
    if (event.key === "Enter" && !event.shiftKey) event.preventDefault();
    // 키워드를 입력했다면
    if (chatRef.current.value === KEYWORD) return reciveKeyword();
    // Enter이고, 정규표현식에 맞다면
    if (event.key === "Enter" && messageRegex.test(chatRef.current.value)){
      sendChatMessage(socket, chatRef.current.value, (errorMessage) => {
        // 해당시점에서 currnt는 null일수가 없음
        if(!errorMessage) chatRef.current!.value = "";
        setErrorMessage(errorMessage);
      });
    }
  };

  // ___________

  const reciveKeyword = () => {
    if (!chatRef.current) return;
    console.log("키워드입력:", chatRef.current.value);
    chatRef.current.value = "";
  };

  return { errorMessage, chatRef, sendClickMessage, sendEnterMessage };
};

export { useChatEventHandler };
