import { type DataCallback, type DataResponse, type RemoveListener, type EmptyCallback } from './types';

type JoinAlert = {
    joinTime: string;
    nickName: string | null;
    roomName: string | null;
    type: "join";   
};

type OutAlert = {
    outTime: string;
    chatTime: string;
    nickName: string | null;
    socketId: string;
    type: 'out';
};

class JoinAlertMapper {
    joinTime: JoinAlert["joinTime"];
    nickName: JoinAlert["nickName"];
    roomName: JoinAlert["roomName"];
    type: JoinAlert["type"];

    constructor( data: JoinAlert){
        this.joinTime = data.joinTime;
        this.nickName = data.nickName;
        this.roomName = data.roomName;
        this.type = data.type;
    }

};

class OutAlertMapper {
    outTime: OutAlert["outTime"];
    chatTime: OutAlert["chatTime"];
    nickName: OutAlert["nickName"];
    socketId: OutAlert["socketId"];
    type: OutAlert["type"];

    constructor( data: OutAlert){
        this.outTime = data.outTime;
        this.chatTime = data.chatTime;
        this.nickName = data.nickName;
        this.socketId = data.socketId;
        this.type = data.type;
    }

};

type ReceiveRoomAlert = ( callback: DataCallback<JoinAlertMapper | OutAlertMapper> ) => void;
type RoomAlertReturn = {
    receiveRoomAlert: ReceiveRoomAlert
    removeListener: RemoveListener;
}

/**
 * @FileDesc
 * - 서버 수신 이벤트 (입장알람, 퇴장알람)
 * - 서버 송신 이벤트 (없음)
*/
const roomAlert = ( socket: GlobalSocket ):RoomAlertReturn => {
    const emptyCallback:EmptyCallback = () => console.warn("Socket not connected");

    if(!socket){
        return { receiveRoomAlert: emptyCallback, removeListener: emptyCallback };
    };

    const receiveRoomAlert:ReceiveRoomAlert = ( callback ) => {
        socket.on("room-alert", ( res: DataResponse<JoinAlert | OutAlert> ) => {
            const mapperData = res.data.type === "join" ? new JoinAlertMapper(res.data) : new OutAlertMapper(res.data);
            callback({...res, data: mapperData})
        })
    };

    const removeListener:RemoveListener = () => {
        socket.off("room-alert", receiveRoomAlert);
    };

    return { receiveRoomAlert, removeListener };
};

export { roomAlert, type JoinAlert, type OutAlert };