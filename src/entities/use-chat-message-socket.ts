import { useSocketConnection } from "@/shared/store/use-socket-connection";

const useChatMessageSocket = () => {
    const { socket } = useSocketConnection();

    const sendChatMessage = ( message: string, callback: (status:number) => void ) => {
        if (!socket) return;
        socket.emit("chat-message", message, (res: {status: number}) => {
            callback(res.status)
        })
      }
      return { sendChatMessage };
    
};

export { useChatMessageSocket };