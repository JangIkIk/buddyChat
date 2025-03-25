import { type DataCallback, type DataResponse } from './types';

type JoinAlert = {
    joinTime: string;
    nickName: string | null;
    roomName: string | null;
    type: "join";   
}

type OutAlert = {
    outTime: string;
    chatTime: string;
    nickName: string | null;
    type: 'out'
}


const roomAlert = ( socket: GlobalSocket ) => {
    const emptyCallback = () => console.warn("Socket not connected");

    if(!socket){
        return { receiveRoomAlert: emptyCallback, removeListener: emptyCallback };
    };

    const receiveRoomAlert = ( callback: DataCallback<JoinAlert | OutAlert> ) => {
        socket.on("room-alert", ( res: DataResponse<JoinAlert | OutAlert> ) => {
            callback(res);
        })
    };

    const removeListener = () => {
        socket.off("room-alert", receiveRoomAlert);
    };

    return { receiveRoomAlert, removeListener };
};

export { roomAlert, type JoinAlert, type OutAlert };