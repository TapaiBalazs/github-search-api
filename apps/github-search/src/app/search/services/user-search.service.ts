import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { RawSearchForm } from '../interfaces/search-form.interfaces';
import { UserDetail, UserSearchListItem, UserSearchListResult } from '../interfaces/user-search.interfaces';
import { buildQuery } from '../utils/query-builder.util';
import { UserSearchServicesModule } from './user-search-services.module';

const API_URL = `https://api.github.com/search/users`;

@Injectable({
  providedIn: UserSearchServicesModule,
})
export class UserSearchService {
  private queryBase = new BehaviorSubject<RawSearchForm>(null);
  private error = new BehaviorSubject<unknown>(null);
  private selectedUser = new BehaviorSubject<UserDetail>(null);

  readonly query$: Observable<string> = this.queryBase.asObservable().pipe(buildQuery());
  readonly error$: Observable<unknown> = this.error.asObservable();
  readonly selectedUser$ = this.selectedUser.asObservable();

  constructor(private http: HttpClient) {}

  search(pagination: PageEvent): Observable<UserSearchListResult> {
    this.error.next(null);
    return this.query$.pipe(
      take(1),
      switchMap((query) => this.http.get<UserSearchListResult>(this.createRequestUrl(query, pagination))),
      catchError((error) => {
        this.error.next(error);
        return throwError(error);
      })
    );
  }

  fetchUserDetails(user: UserSearchListItem): void {
    this.http.get<UserDetail>(user.url).subscribe({
      next: (userDetail) => this.selectedUser.next(userDetail),
      error: (error) => this.error.next(error),
    });
  }

  setFilter(filter: RawSearchForm): void {
    this.queryBase.next(filter);
  }

  private createRequestUrl(query: string, pagination: PageEvent): string {
    const per_page = `per_page=${pagination.pageSize}`;
    const page = `page=${pagination.pageIndex + 1}`;
    return `${API_URL}${query}&${per_page}&${page}`;
  }
}
