import { type SocketCallback } from './types';

type ReceivedTyping = {
    typing: boolean;
}

const chatTyping = ( socket: GlobalSocket | null) => {
    const emptyCallback = () => console.warn("Socket not connected");
    
    if(!socket){
        return {sendChatTyping: emptyCallback, reciveChatTyping: emptyCallback, removeListener: emptyCallback};
    }
    
    const sendChatTyping = ( typing: boolean ) => {
        socket.emit("chat-typing", {typing});
    };

    const reciveChatTyping = ( callback: SocketCallback<ReceivedTyping>) => {
        socket.on("chat-typing", ( res: ReceivedTyping ) => {
            callback(res);
        });
    };

    const removeListener = () => {
        socket.off("chat-typing", reciveChatTyping);
    };

    return { sendChatTyping, reciveChatTyping, removeListener };
}

export { chatTyping };