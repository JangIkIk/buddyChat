import { type EmptyCallback, type DataCallback, type DataResponse } from "./types";
type ReceivedTyping = {typing: boolean};

type EmitSendChatTyping = (typing: boolean) => void;
type OnReciveChatTyping = (callback: DataCallback<ReceivedTyping>) => void;
type ChatTypingReturn = {
  sendChatTyping: EmitSendChatTyping;
  reciveChatTyping: OnReciveChatTyping;
  removeListener: EmptyCallback;
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

  const sendChatTyping: EmitSendChatTyping = (typing) => {
    socket.emit("chat-typing", typing);
  };

  const reciveChatTyping: OnReciveChatTyping = (callback) => {
    socket.on("chat-typing", (res: DataResponse<ReceivedTyping>) => {
      callback(res);
    });
  };

  const removeListener: EmptyCallback = () => {
    socket.off("chat-typing", reciveChatTyping);
  };

  return { sendChatTyping, reciveChatTyping, removeListener };
};

export { chatTyping };
