import {
  type BaseResponse,
  type BaseCallback,
  type RemoveListener,
  type EmptyCallback,
} from "./types";

type ConnectMatch = (callback: BaseCallback) => void;
type DisconnectMatch = (callback: BaseCallback) => void;
type ReceiveMatchTimeout = (callback: BaseCallback) => void;
type RandomMatchReturn = {
  connectMatch: ConnectMatch;
  disconnectMatch: DisconnectMatch;
  receiveMatchTimeout: ReceiveMatchTimeout;
  removeListener: RemoveListener;
};

/**
 * @FileDesc
 * - 서버 수신 이벤트 ( 매치시간 초과 )
 * - 서버 송신 이벤트 ( 매치시작, 매치취소 )
 * - 수신이벤트 해제
 */
const randomMatch = (socket: GlobalSocket): RandomMatchReturn => {
  const emptyCallback: EmptyCallback = () =>
    console.warn("Socket not connected");

  if (!socket) {
    return {
      connectMatch: emptyCallback,
      disconnectMatch: emptyCallback,
      receiveMatchTimeout: emptyCallback,
      removeListener: emptyCallback,
    };
  }

  const connectMatch: ConnectMatch = (callback) => {
    socket.emit("match-start", (res: BaseResponse) => {
      callback(res);
    });
  };

  const disconnectMatch: DisconnectMatch = (callback) => {
    socket.emit("match-cancel", (res: BaseResponse) => {
      callback(res);
    });
  };

  const receiveMatchTimeout: ReceiveMatchTimeout = (callback) => {
    socket.on("match-result", (res: BaseResponse) => {
      callback(res);
    });
  };

  const removeListener: RemoveListener = () => {
    socket.off("match-result", receiveMatchTimeout);
  };

  return { connectMatch, disconnectMatch, receiveMatchTimeout, removeListener };
};

export { randomMatch };
