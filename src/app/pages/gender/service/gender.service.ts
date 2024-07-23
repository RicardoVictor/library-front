import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedList } from 'src/app/shared/models/paged-list.model';
import { GenderResponse } from '../models/gender.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private apiUrl = 'http://localhost:5054/api/gender';

  constructor(private http: HttpClient) {}

  get(): Observable<PagedList<GenderResponse>> {
    return this.http.get<PagedList<GenderResponse>>(this.apiUrl);
  }
}
