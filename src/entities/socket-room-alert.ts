import { type BaseResponse, type SocketCallback } from './types';

type AlertType = "out" | "join";

type RoomAlert = {
    type: AlertType;
    roomOutTime: string;
    chatTime: string;
    nickName: string | null;
    socketId: string;
};

interface ReceviedRoomAlertResponse extends BaseResponse {
    data: RoomAlert;
};

const roomAlert = ( socket: GlobalSocket | null ) => {
    const emptyCallback = () => console.warn("Socket not connected");

    if(!socket){
        return { receiveRoomAlert: emptyCallback, removeListener: emptyCallback };
    };

    const receiveRoomAlert = ( callback: SocketCallback<ReceviedRoomAlertResponse> ) => {
        socket.on("room-alert", ( res: ReceviedRoomAlertResponse ) => {
            callback(res);
        })
    }

    const removeListener = () => {
        socket.off("room-alert", receiveRoomAlert);
    }

    return { receiveRoomAlert, removeListener };
};

export { roomAlert } 