import { EmptyCallback, RemoveListener } from "./types";
type ReceivedTyping = { typing: boolean };

type SendChatTyping = (typing: ReceivedTyping) => void;
type ReciveChatTyping = (callback: (res: ReceivedTyping) => void) => void;
type ChatTypingReturn = {
  sendChatTyping: SendChatTyping;
  reciveChatTyping: ReciveChatTyping;
  removeListener: RemoveListener;
};

/**
 * @FileDesc
 * - 서버 수신 이벤트 (타이핑여부)
 * - 서버 송신 이벤트 (타이핑: true | false)
 */
const chatTyping = (socket: GlobalSocket): ChatTypingReturn => {
  const emptyCallback: EmptyCallback = () =>
    console.warn("Socket not connected");

  if (!socket) {
    return {
      sendChatTyping: emptyCallback,
      reciveChatTyping: emptyCallback,
      removeListener: emptyCallback,
    };
  }

  const sendChatTyping: SendChatTyping = (typing) => {
    socket.emit("chat-typing", typing);
  };

  const reciveChatTyping: ReciveChatTyping = (callback) => {
    socket.on("chat-typing", (res: ReceivedTyping) => {
      callback(res);
    });
  };

  const removeListener: RemoveListener = () => {
    socket.off("chat-typing", reciveChatTyping);
  };

  return { sendChatTyping, reciveChatTyping, removeListener };
};

export { chatTyping };
