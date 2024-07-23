import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedList } from 'src/app/shared/models/paged-list.model';
import { AuthorResponse } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'http://localhost:5054/api/author';

  constructor(private http: HttpClient) {}

  get(): Observable<PagedList<AuthorResponse>> {
    return this.http.get<PagedList<AuthorResponse>>(this.apiUrl);
  }
}
