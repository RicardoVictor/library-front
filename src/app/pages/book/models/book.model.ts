import { AuthorResponse } from '../../author/models/author.model';
import { GenderResponse } from '../../gender/models/gender.model';

export interface BookResponse {
  id: string;
  name: string;
  author: AuthorResponse;
  gender: GenderResponse;
}

export interface BookPostRequest {
  [x: string]: any;
  name: string;
  authorId: string;
  genderId: string;
}

export interface BookPutRequest {
  name: string;
  authorId: string;
  genderId: string;
}
