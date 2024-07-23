export interface GenderResponse {
  id: string;
  name: string;
}

export interface GenderPostRequest {
  [x: string]: any;
  name: string;
}

export interface GenderPutRequest {
  name: string;
}
