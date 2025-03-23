import { useRef, useState, useEffect, type RefObject, type KeyboardEvent } from "react";
import { useSocketConnection } from "@/shared/store/use-socket-connection";
import { useChatMessageSocket } from "@/entities/use-chat-message-socket";
import { useChatTypingSocket } from "@/entities/use-chat-typing-socket";
import { chatMessageRegex } from "@/shared/consts/regex";

const useSendMessageOnEnter = ( chatRef: RefObject<HTMLTextAreaElement | null>) => {

  // typing
  const timerRef = useRef<number | null>(null);
  const { socket } = useSocketConnection();
  const [renderTyping, setRenderTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { sendChatTyping, reciveChatTyping, eventName } = useChatTypingSocket();

  // message
  const { sendChatMessage } = useChatMessageSocket();

  const typingHandler = () => {
    if (!chatRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    if (chatRef.current.value.trim() !== "") {
      if (!isTyping) {
        setIsTyping(true);
        sendChatTyping(true);
      }

      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      timerRef.current = window.setTimeout(() => {
        setIsTyping(false);
        sendChatTyping(false);
      }, 2000);
    }
  };

  const enterHanlder = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // chatRef.current or socket이 없을경우
    if (!chatRef.current) return;
    // 한글 조합형 입력방식으로인해, 한글을 조합중이라면
    if (event.nativeEvent.isComposing) return;
    // Enter로 줄바꿈을 방지하기위한 Enter + Shift 가아니라면 줄바꿈 방지
    if (event.key === "Enter" && !event.shiftKey) event.preventDefault();
    // 키워드를 입력했다면
    if (chatRef.current.value === "KEYWORD") return console.log("키워드전송");
    // Enter만 눌렸다면
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      chatMessageRegex(chatRef.current.value)
    ) {
      sendChatTyping(false);
      setIsTyping(false)
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
    }
  };

  useEffect(() => {
    if (!socket) return;

    reciveChatTyping((typing) => {
      setRenderTyping(typing);
    });

    return () => {
      socket.off(eventName, reciveChatTyping);
    };
  }, []);

  return { enterHanlder, typingHandler, renderTyping };
};

export { useSendMessageOnEnter };
