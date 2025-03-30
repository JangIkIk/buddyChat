import {
  type BaseResponse,
  type DataResponse,
  type BaseCallback,
  type DataCallback,
  type EmptyCallback,
  type RemoveListener,
} from "./types";

type ChatMessage = {
  chatMessageIdx: number;
  chatMessage: string;
  chatTime: string;
  sender: string;
  nickName: string | null;
};

class ChatMessageMapper {
  idx: ChatMessage["chatMessageIdx"];
  chatMessageList: ChatMessage["chatMessage"][];
  chatTime: ChatMessage["chatTime"];
  sender: ChatMessage["sender"];
  nickName: ChatMessage["nickName"];
  type: "message";

  constructor(data: ChatMessage) {
    this.idx = data.chatMessageIdx;
    this.chatMessageList = [data.chatMessage];
    this.chatTime = data.chatTime;
    this.sender = data.sender;
    this.nickName = data.nickName;
    this.type = "message";
  }
}

type SendChatMessage = (chatMessage: string, callback: BaseCallback) => void;
type ReceiveChatMessage = (callback: DataCallback<ChatMessageMapper>) => void;
type ChatMessageReturn = {
  sendChatMessage: SendChatMessage;
  receiveChatMessage: ReceiveChatMessage;
  removeListener: RemoveListener;
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

  const sendChatMessage: SendChatMessage = (chatMessage, callback) => {
    socket.emit("chat-message", chatMessage, (res: BaseResponse) => {
      callback(res);
    });
  };

  const receiveChatMessage: ReceiveChatMessage = (callback) => {
    socket.on("chat-message", (res: DataResponse<ChatMessage>) => {
      const mapperData = new ChatMessageMapper(res.data);
      callback({ ...res, data: mapperData });
    });
  };

  const removeListener: RemoveListener = () => {
    socket.off("chat-message", receiveChatMessage);
  };

  return { sendChatMessage, receiveChatMessage, removeListener };
};

export { chatMessage, type ChatMessageMapper };
