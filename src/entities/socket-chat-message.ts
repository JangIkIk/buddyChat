import { type BaseResponse, type DataResponse, type BaseCallback, type DataCallback } from './types';

type ChatMessage = {
    chatMessageIdx: number;
    chatMessage: string;
    chatTime: string;
    sender: string;
    nickName: string | null;
};

type ChatMessageMapper = {
    idx: number;
    chatMessageList: string[];
    chatTime: string;
    sender: string;
    nickName: string | null;
};

const chatMessage = ( socket: GlobalSocket ) => {
    const emptyCallback = () => console.warn("Socket not connected");


    if (!socket) {
        console.warn("Socket not connected");
        return { sendChatMessage: emptyCallback, receiveChatMessage: emptyCallback, removeListener: emptyCallback};
    };   

    const sendChatMessage = (chatMessage: string, callback: BaseCallback) => {
        socket.emit("chat-message", chatMessage, (res: BaseResponse) => {
            callback(res);
        });
    };
      
    const receiveChatMessage = (callback: DataCallback<ChatMessageMapper>) => {
        socket.on("chat-message", (res: DataResponse<ChatMessage>)=>{
            const mapperData:ChatMessageMapper = {
                idx: res.data.chatMessageIdx,
                chatMessageList:[res.data.chatMessage],
                chatTime: res.data.chatTime,
                sender: res.data.sender,
                nickName: res.data.nickName,
            }
            callback({...res, data: mapperData});
        });
    };

    const removeListener = () => {
        socket.off("chat-message", receiveChatMessage);
    };
        
    return { sendChatMessage, receiveChatMessage, removeListener };
};

export { chatMessage, type ChatMessageMapper };