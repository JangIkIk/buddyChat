import { type BaseResponse, type SocketCallback} from './types';

const roomLeave = ( socket: GlobalSocket | null) => {
    const emptyCallback = () => console.warn("Socket not connected");

    if(!socket){
        return { sendRoomLeave: emptyCallback };
    }

    const sendRoomLeave = ( callback: SocketCallback<BaseResponse> ) => {
        socket.emit("room-outside", (res: BaseResponse) => {
            callback(res);
        });
    };

    return { sendRoomLeave };

}

export { roomLeave };