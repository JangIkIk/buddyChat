import { useSocketConnection } from "@/shared/store/use-socket-connection";

const useChatSendMessage = () => {
    const { socket } = useSocketConnection();

    const submitMessage = ( message: string, callback: (status:number) => void ) => {
        if (!socket) return;
        socket.emit("chat-message", message, (res: {status: number}) => {
            callback(res.status)
        })
      }
      return { submitMessage };
    
};

export { useChatSendMessage };