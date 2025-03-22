import { useSocketConnection } from "@/shared/store/use-socket-connection";

interface MessageType {
    id: number;
    chatMessage: string;
    chatTime: string;
    sender: string;
    nickName: string | null;
    prevSameTime: boolean;
}

const useChatMessageSocket = () => {
    const { socket } = useSocketConnection();
    const eventName = "chat-message";

    const sendChatMessage = ( message: string, callback: (status:number) => void ) => {
        if (!socket) return;
        socket.emit(eventName, message, (res: {status: number}) => {
            callback(res.status);
        })
      }
      
      const reciveChatMessage = (callback: ( res: {status: number, data: MessageType } ) => void) => {
          if (!socket) return;
          socket.on(eventName, (res: { status: number, data: MessageType})=>{
            callback(res);
          })
        }
        
    return { sendChatMessage, reciveChatMessage, eventName};
};

export { useChatMessageSocket, type MessageType };