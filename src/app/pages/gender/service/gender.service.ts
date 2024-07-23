import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedList } from 'src/app/shared/models/paged-list.model';
import { GenderFilterRequest } from '../models/gender-filter.model';
import {
  GenderPostRequest,
  GenderPutRequest,
  GenderResponse,
} from '../models/gender.model';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private apiUrl = 'http://localhost:5054/api/gender';

  constructor(private http: HttpClient) {}

  get(
    filter: GenderFilterRequest | null = null
  ): Observable<PagedList<GenderResponse>> {
    if (filter == null) filter = {} as GenderFilterRequest;

    const params = this.serializeQueryParams(filter);

    return this.http.get<PagedList<GenderResponse>>(this.apiUrl, {
      params,
    });
  }

  getById(id: string): Observable<GenderResponse> {
    return this.http.get<GenderResponse>(`${this.apiUrl}/${id}`);
  }

  create(book: GenderPostRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, book);
  }

  update(id: string, book: GenderPutRequest): Observable<number> {
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
