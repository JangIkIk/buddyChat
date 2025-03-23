import { type BaseResponse, type SocketCallback} from './types';

type ChatMessage = {
    chatMessageIdx: number;
    chatMessage: string;
    chatTime: string;
    sender: string;
    nickName: string | null;
};

interface ReceivedChatMessageResponse extends BaseResponse {
    data: ChatMessage;
};

const chatMessage = ( socket: GlobalSocket | null ) => {
    const emptyCallback = () => console.warn("Socket not connected");


    if (!socket) {
        console.warn("Socket not connected");
        return { sendChatMessage: emptyCallback, receiveChatMessage: emptyCallback, removeListener: emptyCallback};
    };   

    const sendChatMessage = (chatMessage: string, callback: SocketCallback<BaseResponse>) => {
        socket.emit("chat-message", chatMessage, (res: BaseResponse) => {
            callback(res);
        });
    };
      
    const receiveChatMessage = (callback: SocketCallback<ReceivedChatMessageResponse>) => {
        socket.on("chat-message", (res: ReceivedChatMessageResponse)=>{
            callback(res);
        });
    };

    const removeListener = () => {
        socket.off("chat-message", receiveChatMessage);
    }
        
    return { sendChatMessage, receiveChatMessage, removeListener };
};

export { chatMessage, type ChatMessage };