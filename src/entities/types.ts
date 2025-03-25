interface BaseResponse {
    status: number;
    message: string;
};

interface DataResponse<T> extends BaseResponse {
    data: T;
};

type BaseCallback = (res: BaseResponse) => void;
type DataCallback<T> = (res: DataResponse<T>) => void;


export { type BaseResponse, type DataResponse, type BaseCallback, type DataCallback };