import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { DEFAULT_PAGINATION_STATE } from '../../constants/pagination.constants';
import { UserSearchListItem, UserSearchListResult } from '../../interfaces/user-search.interfaces';
import { UserSearchService } from '../../services/user-search.service';

@Component({
  selector: 'githubsearch-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {

  private readonly searchAction = new Subject<void>();
  private readonly pagination = new BehaviorSubject<PageEvent>(DEFAULT_PAGINATION_STATE);

  private readonly pagination$ = this.pagination.asObservable().pipe(shareReplay(1));

  readonly searchProgress$: Observable<number> = this.userSearchService.searchProgress$;

  readonly pageSize$: Observable<number> = this.pagination$
    .pipe(pluck('pageSize'));

  readonly searchResults$: Observable<UserSearchListResult> = combineLatest([
    this.searchAction.asObservable(),
    this.pagination$
  ]).pipe(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    switchMap(([searchAction, pagination]) => this.userSearchService.search(pagination)),
    shareReplay(1)
  );

  readonly users$: Observable<UserSearchListItem[]> = this.searchResults$
    .pipe(
      pluck<UserSearchListResult, UserSearchListItem[]>('items'),
      startWith([])
    );
  readonly totalCount$: Observable<number> = this.searchResults$
    .pipe(
      pluck<UserSearchListResult, number>('total_count'),
      startWith(0)
    );

  constructor(private userSearchService: UserSearchService) {
  }

  triggerSearch(): void {
    this.searchAction.next();
  }

  onPagination(page: PageEvent): void {
    this.pagination.next(page);
  }

}
