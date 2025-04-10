import {
  type StatusResponse,
  type DataResponse,
  type EmptyCallback,
  type StatusCallback,
  type DataCallback,
} from "./types";

type MatchTimeout = {type: "timeout"}
type EmitConnectMatch = (callback: StatusCallback) => void;
type EmitDisconnectMatch = (callback: StatusCallback) => void;
type OnReceiveMatchTimeout = (callback: DataCallback<MatchTimeout>) => void;

type RandomMatchReturn = {
  connectMatch: EmitConnectMatch;
  disconnectMatch: EmitDisconnectMatch;
  receiveMatchTimeout: OnReceiveMatchTimeout;
  removeListener: EmptyCallback;
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

  const connectMatch: EmitConnectMatch = (callback) => {
    socket.emit("match-start", (res: StatusResponse) => {
      callback(res);
    });
  };

  const disconnectMatch: EmitDisconnectMatch = (callback) => {
    socket.emit("match-cancel", (res: StatusResponse) => {
      callback(res);
    });
  };

  const receiveMatchTimeout: OnReceiveMatchTimeout = (callback) => {
    socket.on("match-result", (res: DataResponse<MatchTimeout> ) => {
      callback(res);
    });
  };

  const removeListener: EmptyCallback = () => {
    socket.off("match-result", receiveMatchTimeout);
  };

  return { connectMatch, disconnectMatch, receiveMatchTimeout, removeListener };
};

export { randomMatch };
