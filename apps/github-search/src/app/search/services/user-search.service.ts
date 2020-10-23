import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  UserDetail,
  UserSearchListItem,
  UserSearchListResult,
} from '../interfaces/user-search.interfaces';
import { UserSearchServicesModule } from './user-search-services.module';

const API_URL = `https://api.github.com/search/users?q=type:user`;

@Injectable({
  providedIn: UserSearchServicesModule,
})
export class UserSearchService {
  private error = new BehaviorSubject<unknown>(null);
  private selectedUser = new BehaviorSubject<UserDetail>(null);
  readonly selectedUser$ = this.selectedUser.asObservable();

  constructor(private http: HttpClient) {}

  search(pagination: PageEvent): Observable<UserSearchListResult> {
    return this.http
      .get<UserSearchListResult>(this.createRequestUrl(pagination))
      .pipe(
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

  private createRequestUrl(pagination: PageEvent): string {
    const per_page = `per_page=${pagination.pageSize}`;
    const page = `page=${pagination.pageIndex + 1}`;
    return `${API_URL}&${per_page}&${page}`;
  }
}
