import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  search(): Observable<UserSearchListResult> {
    this.searchProgress.next(1);
    return this.http.get<UserSearchListResult>(API_URL)
      .pipe(
        tap(_ => this.searchProgress.next(100))
      );
  }
}
