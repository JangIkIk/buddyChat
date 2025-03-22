import { RefObject, type KeyboardEvent } from "react";
import { useChatMessageSocket } from "@/entities/use-chat-message-socket";
import { chatMessageRegex } from '@/shared/consts/regex';


const useSendMessageOnEnter = ( chatRef: RefObject<HTMLTextAreaElement | null>) => {
  const { sendChatMessage } = useChatMessageSocket();

  const enterHanlder = (event: KeyboardEvent<HTMLTextAreaElement>) => {
     // chatRef.current or socket이 없을경우
     if (!chatRef.current) return;
     // 한글 조합형 입력방식으로인해, 한글을 조합중이라면
     if (event.nativeEvent.isComposing) return;
     // Enter로 줄바꿈을 방지하기위한 Enter + Shift 가아니라면 줄바꿈 방지
     if (event.key === "Enter" && !event.shiftKey) event.preventDefault();
     // 키워드를 입력했다면
     if (chatRef.current.value === "KEYWORD") return console.log("키워드전송")
     // Enter만 눌렸다면
     if (event.key === "Enter" && !event.shiftKey && chatMessageRegex(chatRef.current.value)){
       // 해당부분처럼 메세지와 알람 모든것을 전역상태로 관리하는게 좋을듯
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

  return { enterHanlder };
};

export { useSendMessageOnEnter }
