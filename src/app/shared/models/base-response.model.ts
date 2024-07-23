
export interface BaseResponse<T> {
  statusCode : number;
  success: boolean;
  message: string;
  errors: string[];
  data: T;
}
