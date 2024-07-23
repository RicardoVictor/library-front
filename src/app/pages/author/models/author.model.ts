export interface AuthorResponse {
  id: string;
  name: string;
}

export interface AuthorPostRequest {
  [x: string]: any;
  name: string;
}

export interface AuthorPutRequest {
  name: string;
}
