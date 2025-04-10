interface StatusResponse {
  status: number;
  message: string;
};

interface DataResponse<T>{ 
  data: T;
};


type EmptyCallback = () => void;
type DefaultCallback<T> = (arg: T) => void;
type StatusCallback = ( arg: StatusResponse ) => void;
type DataCallback<T> = ( arg: DataResponse<T> ) => void;

export {
  type StatusResponse,
  type DataResponse,
  type EmptyCallback,
  type DefaultCallback,
  type StatusCallback,
  type DataCallback,
};
