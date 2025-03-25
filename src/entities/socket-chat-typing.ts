
type ReceivedTyping = {typing: boolean}

const chatTyping = ( socket: GlobalSocket ) => {
    const emptyCallback = () => console.warn("Socket not connected");
    
    if(!socket){
        return {sendChatTyping: emptyCallback, reciveChatTyping: emptyCallback, removeListener: emptyCallback};
    }
    
    const sendChatTyping = ( typing: ReceivedTyping ) => {
        socket.emit("chat-typing", typing);
    };

    const reciveChatTyping = ( callback: (res: ReceivedTyping) => void ) => {
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