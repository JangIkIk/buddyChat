import {
  type StatusResponse,
  type DataResponse,
  type StatusCallback,
  type DataCallback,
  type EmptyCallback,
} from "./types";

type ChatMessage = {
  chatMessageIdx: number;
  chatMessage: string;
  chatTime: string;
  senderId: string;
  nickName: string | null;
};

type ChatMessageMapper = {
  idx: number;
  chatMessageList: string[];
  chatTime: string;
  senderId: string;
  nickName: string | null;
  type: "message";
};

type EmitSendChatMessage = (chatMessage: string, callback: StatusCallback) => void;
type OnReceiveChatMessage = (callback: DataCallback<ChatMessageMapper>) => void;
type ChatMessageReturn = {
  sendChatMessage: EmitSendChatMessage;
  receiveChatMessage: OnReceiveChatMessage;
  removeListener: EmptyCallback;
};

/**
 * @FileDesc
 * - 서버 수신 이벤트 (채팅 메세지)
 * - 서버 송신 이벤트 (채팅 메세지)
 */
const chatMessage = (socket: GlobalSocket): ChatMessageReturn => {
  const emptyCallback:EmptyCallback = () => console.warn("Socket not connected");

  if (!socket) {
    return {
      sendChatMessage: emptyCallback,
      receiveChatMessage: emptyCallback,
      removeListener: emptyCallback,
    };
  }

  const sendChatMessage: EmitSendChatMessage = (chatMessage, callback) => {
    socket.emit("chat-message", chatMessage, (res: StatusResponse) => {
      callback(res);
    });
  };

  const receiveChatMessage: OnReceiveChatMessage = (callback) => {
    socket.on("chat-message", (res: DataResponse<ChatMessage>) => {

      const mapperData:ChatMessageMapper = {
        idx: res.data.chatMessageIdx,
        chatMessageList: [res.data.chatMessage],
        chatTime: res.data.chatTime,
        senderId: res.data.senderId,
        nickName: res.data.nickName,
        type: "message",
      };

      callback({data:mapperData});
    });
  };

  const removeListener: EmptyCallback = () => {
    socket.off("chat-message", receiveChatMessage);
  };

  return { sendChatMessage, receiveChatMessage, removeListener };
};

export { chatMessage, type ChatMessageMapper };
