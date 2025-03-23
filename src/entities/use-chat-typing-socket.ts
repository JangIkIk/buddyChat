import { useSocketConnection } from '@/shared/store/use-socket-connection';

const useChatTypingSocket = () => {
    const { socket } = useSocketConnection();
    const eventName = "chat-typing";
    
    const sendChatTyping = ( typing: boolean ) => {
        if(!socket) return;
        socket.emit(eventName, typing);
    }

    const reciveChatTyping = ( callback: (typing: boolean) => void) => {
        if(!socket) return;
        socket.on(eventName, ( typing: boolean ) => {
            callback(typing);
        })
    }

    return { sendChatTyping, reciveChatTyping, eventName };
}

export { useChatTypingSocket };