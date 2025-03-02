import { useRef, type KeyboardEvent } from "react";

const useChatMessage = () => {
  const chatRef = useRef<HTMLTextAreaElement>(null);
  const KEYWORD = "@방";

  const sendClickMessage = () => {
    if (!chatRef.current || chatRef.current.value === "") return;
    if (chatRef.current.value === KEYWORD) return reciveKeyword();

    console.log("Click:", chatRef.current.value);
    chatRef.current.value = "";
  };

  // ___________

  const sendEnterMessage = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!chatRef.current || chatRef.current.value === "") return;
    if (event.nativeEvent.isComposing) return;
    if (event.key !== "Enter" || event.shiftKey) return;

    event.preventDefault();
    if (chatRef.current.value === KEYWORD) return reciveKeyword();
    console.log("Enter:", chatRef.current.value);
    chatRef.current.value = "";
  };

  // ___________

  const reciveKeyword = () => {
    if (!chatRef.current) return;
    console.log("키워드입력:", chatRef.current.value);
    chatRef.current.value = "";
  };

  return { chatRef, sendClickMessage, sendEnterMessage };
};

export { useChatMessage };
