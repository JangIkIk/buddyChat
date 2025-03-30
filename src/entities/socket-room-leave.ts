import { type EmptyCallback } from './types';

type RoomLeaveReturn = {
    sendRoomLeave: EmptyCallback,
}

/**
 * @FileDesc
 * - 서버 수신 이벤트 (없음)
 * - 서버 송신 이벤트 (방 나가기)
*/
const roomLeave = ( socket: GlobalSocket ): RoomLeaveReturn => {
    const emptyCallback:EmptyCallback = () => console.warn("Socket not connected");

    if(!socket){
        return { sendRoomLeave: emptyCallback };
    }

    const sendRoomLeave = () => {
        socket.emit("room-outside");
    };

    return { sendRoomLeave };

}

export { roomLeave };