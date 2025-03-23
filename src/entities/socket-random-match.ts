import { type BaseResponse, type SocketCallback} from './types';

const randomMatch = ( socket: GlobalSocket | null ) => {
  const emptyCallback = () => console.warn("Socket not connected");
  
  if(!socket){
    return { connectMatch: emptyCallback, disconnectMatch: emptyCallback, resultMatch: emptyCallback, removeListener: emptyCallback};
  }

  const connectMatch = (callback: SocketCallback<BaseResponse>) => {
    socket.emit("match-start", (res: BaseResponse) => {
        callback(res);
    });
  };

  const disconnectMatch = (callback: SocketCallback<BaseResponse>) => {
    socket.emit("match-cancel", (res: BaseResponse) => {
      callback(res);
    });
  };

  const resultMatch = (callback: SocketCallback<BaseResponse>) => {
    socket.on("match-result", (res: BaseResponse) => {
      callback(res);
    });
  };

  const removeListener = () => {
    socket.off("match-result", resultMatch);
  }

  return { connectMatch, disconnectMatch, resultMatch, removeListener };
};

export { randomMatch };
