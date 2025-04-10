import {
  type DataCallback,
  type DataResponse,
  type EmptyCallback,
} from "./types";

type JoinAlert = {
  joinTime: string;
  nickName: string | null;
  roomName: string | null;
  type: "join";
};

type JoinAlertMapper = {
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
  type: "out";
};

type OutAlertMapper = {
  outTime: string;
  chatTime: string;
  nickName: string | null;
  socketId: string;
  type: "out";
};

type MidnighAlert = {
  midnight: string;
  type: "midnight";
};

type MidnighMapper = {
  midnight: string;
  type: "midnight";
};

type ReceiveRoomAlert = (
  callback: DataCallback<JoinAlertMapper | OutAlertMapper | MidnighMapper>
) => void;
type RoomAlertReturn = {
  receiveRoomAlert: ReceiveRoomAlert;
  removeListener: EmptyCallback;
};

/**
 * @FileDesc
 * - 서버 수신 이벤트 (입장알람, 퇴장알람)
 * - 서버 송신 이벤트 (없음)
 */
const roomAlert = (socket: GlobalSocket): RoomAlertReturn => {
  const emptyCallback: EmptyCallback = () =>
    console.warn("Socket not connected");

  if (!socket) {
    return { receiveRoomAlert: emptyCallback, removeListener: emptyCallback };
  }

  const receiveRoomAlert: ReceiveRoomAlert = (callback) => {
    socket.on(
      "room-alert",
      (res: DataResponse<JoinAlert | OutAlert | MidnighAlert>) => {
        let mapperData;


        switch (res.data.type) {
          case "join":
            mapperData = {
              joinTime: res.data.joinTime,
              nickName: res.data.nickName,
              roomName: res.data.roomName,
              type: res.data.type,
            };
            break;
          case "out":
            mapperData = {
              outTime: res.data.outTime,
              chatTime: res.data.chatTime,
              nickName: res.data.nickName,
              socketId: res.data.socketId,
              type: res.data.type,
            };
            break;
          case "midnight":
            mapperData = {
              midnight: res.data.midnight,
              type: res.data.type,
            };
            break;
        }

        callback({ data: mapperData });
      }
    );
  };

  const removeListener: EmptyCallback = () => {
    socket.off("room-alert", receiveRoomAlert);
  };

  return { receiveRoomAlert, removeListener };
};

export { roomAlert, type JoinAlert, type OutAlert };
