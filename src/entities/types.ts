interface BaseResponse {
    status: number;
    message: string;
};

type SocketCallback<T> = (res: T) => void;

export { type BaseResponse, type SocketCallback };