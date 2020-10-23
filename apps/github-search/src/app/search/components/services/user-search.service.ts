import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserSearchListResult } from '../../interfaces/user-search.interfaces';
import { UserSearchServicesModule } from './user-search-services.module';

const API_URL = `https://api.github.com/search/users?q=type:user`;

@Injectable({
  providedIn: UserSearchServicesModule
})
export class UserSearchService {

  private searchProgress = new BehaviorSubject(0);
  readonly searchProgress$ = this.searchProgress.asObservable()
    .pipe(map(percentage => percentage >= 100 ? 0 : percentage));

  constructor(private http: HttpClient) {}

  search(pagination: PageEvent): Observable<UserSearchListResult> {
    this.searchProgress.next(1);
    return this.http.get<UserSearchListResult>(this.createRequestUrl(pagination))
      .pipe(
        tap(_ => this.searchProgress.next(100))
      );
  }

  private createRequestUrl(pagination: PageEvent): string {
    const per_page = `per_page=${pagination.pageSize}`
    const page = `page=${pagination.pageIndex + 1}`
    return `${API_URL}&${per_page}&${page}`;
  }
}
