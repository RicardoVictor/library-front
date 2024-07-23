import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedList } from 'src/app/shared/models/paged-list.model';
import {
  AuthorPostRequest,
  AuthorPutRequest,
  AuthorResponse,
} from '../models/author.model';
import { AuthorFilterRequest } from '../models/author-filter.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'http://localhost:5054/api/author';

  constructor(private http: HttpClient) {}

  get(
    filter: AuthorFilterRequest | null = null
  ): Observable<PagedList<AuthorResponse>> {
    if (filter == null) filter = {} as AuthorFilterRequest;

    const params = this.serializeQueryParams(filter);

    return this.http.get<PagedList<AuthorResponse>>(this.apiUrl, {
      params,
    });
  }

  getById(id: string): Observable<AuthorResponse> {
    return this.http.get<AuthorResponse>(`${this.apiUrl}/${id}`);
  }

  create(book: AuthorPostRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, book);
  }

  update(id: string, book: AuthorPutRequest): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, book);
  }

  delete(id: string): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`);
  }

  private serializeQueryParams(obj: any): any {
    let queryBuilder = new HttpParams();

    Object.keys(obj).forEach((k) => {
      if (Array.isArray(obj[k])) {
        (obj[k] as []).forEach(
          (value) => (queryBuilder = queryBuilder.append(k, value))
        );
      } else if (obj[k]) {
        queryBuilder = queryBuilder.append(k, obj[k]);
      }
    });

    return queryBuilder;
  }
}
