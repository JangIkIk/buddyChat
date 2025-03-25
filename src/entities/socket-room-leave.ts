import { type BaseResponse, type BaseCallback} from './types';

const roomLeave = ( socket: GlobalSocket ) => {
    const emptyCallback = () => console.warn("Socket not connected");

    if(!socket){
        return { sendRoomLeave: emptyCallback };
    }

    const sendRoomLeave = ( callback: BaseCallback ) => {
        socket.emit("room-outside", (res: BaseResponse) => {
            callback(res);
        });
    };

    return { sendRoomLeave };

}

export { roomLeave };