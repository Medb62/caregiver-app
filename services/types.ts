import { AxiosError } from 'axios';


export type APIErrorResponse = AxiosError<{
    error: string;
    errorCode: string;
    message: string | undefined;
    statusCode: number | undefined;
  }>;

  export type APISuccessResponse<T> = {
    status: number | undefined;
    message: string | undefined;
    data: T;
  };