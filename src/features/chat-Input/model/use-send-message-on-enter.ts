// package & type
import { useRef, useState, useEffect, type RefObject, type KeyboardEvent } from "react";
// layer
import { useSocketConnection } from "@/shared/store/use-socket-connection";
import { chatMessage } from "@/entities/socket-chat-message";
import { chatTyping } from "@/entities/socket-chat-typing";
import { chatMessageRegex } from "@/shared/consts/regex";


type EnterHanlder = (event: KeyboardEvent<HTMLTextAreaElement>) => void;
type TypingHandler = () => void;
type RenderTyping = boolean;
type SendMessageOnEnterReturn = {
  enterHanlder: EnterHanlder,
  typingHandler: TypingHandler,
  renderTyping: RenderTyping,
}

/**
 * @FileDesc
 * - 서버 송신 핸들러 (챠팅 메시지, 타이핑여부)
 * - 
*/
const useSendMessageOnEnter = ( chatRef: RefObject<HTMLTextAreaElement | null>):SendMessageOnEnterReturn => {

  const timerRef = useRef<number | null>(null);
  const { socket } = useSocketConnection();
  const [renderTyping, setRenderTyping] = useState<RenderTyping>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { sendChatTyping, reciveChatTyping, removeListener } = chatTyping(socket);

  const { sendChatMessage } = chatMessage(socket);

  const typingHandler:TypingHandler = () => {
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

  const enterHanlder:EnterHanlder = (event) => {
    if (!chatRef.current) return;
    if (event.nativeEvent.isComposing) return; // 한글 조합형 입력방식으로인해, 한글을 조합중이라면
    if (event.key === "Enter" && !event.shiftKey) event.preventDefault(); // Enter로 줄바꿈을 방지하기위한 Enter + Shift 가아니라면 줄바꿈 방지
    if ( // Enter만 눌렸다면
      event.key === "Enter" &&
      !event.shiftKey &&
      chatMessageRegex(chatRef.current.value)
    ) {
      sendChatTyping(false);
      setIsTyping(false);
      sendChatMessage(chatRef.current.value, (res) => {
        switch (res.status) {
          case 200:
            if (chatRef.current) chatRef.current.value = "";
            break;
          default:
            alert("메세지를 전송할수가 없습니다.");
            console.warn("cannot find the sendChatMessage(keyBoard) status code");
        }
      });
      chatRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!socket) return;

    reciveChatTyping((res) => {
      const { data } = res;
      setRenderTyping(data.typing);
    });

    return () => {
      removeListener();
    };
  }, []);

  return { enterHanlder, typingHandler, renderTyping };
};

export { useSendMessageOnEnter };
