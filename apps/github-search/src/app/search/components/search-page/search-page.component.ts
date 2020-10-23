import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  map,
  pluck,
  scan,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { error } from 'util';
import { DEFAULT_PAGINATION_STATE } from '../../constants/pagination.constants';
import {
  UserSearchListItem,
  UserSearchListResult,
} from '../../interfaces/user-search.interfaces';
import { UserSearchService } from '../../services/user-search.service';

const INITIAL_SEARCH_RESULTS: UserSearchListResult = {
  total_count: 0,
  items: [],
};

type SearchActions = 'START' | 'STOP';

@Component({
  selector: 'githubsearch-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  private readonly searchAction = new Subject<SearchActions>();
  private readonly pagination = new BehaviorSubject<PageEvent>(
    DEFAULT_PAGINATION_STATE
  );
  private readonly isSearching = new BehaviorSubject<boolean>(false);

  private readonly pagination$ = this.pagination
    .asObservable()
    .pipe(shareReplay(1));

  readonly isSearching$ = this.isSearching.asObservable();
  readonly selectedUser$ = this.userSearchService.selectedUser$;
  readonly pageSize$: Observable<number> = this.pagination$.pipe(
    pluck('pageSize')
  );
  readonly searchAction$ = this.searchAction
    .asObservable()
    .pipe(
      tap((action: SearchActions) => this.isSearching.next(action === 'START'))
    );

  readonly searchResults$: Observable<UserSearchListResult> = combineLatest([
    this.searchAction$,
    this.pagination$,
  ]).pipe(
    switchMap(([searchAction, pagination]) => {
      if (searchAction === 'STOP') {
        return of(null);
      }
      return this.userSearchService
        .search(pagination)
        .pipe(catchError((error) => of(null)));
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tap((_) => this.isSearching.next(false)),
    startWith(INITIAL_SEARCH_RESULTS),
    scan((previous, next) => next || previous),
    shareReplay(1)
  );

  readonly users$: Observable<UserSearchListItem[]> = this.searchResults$.pipe(
    pluck<UserSearchListResult, UserSearchListItem[]>('items'),
    startWith([])
  );
  readonly totalCount$: Observable<number> = this.searchResults$.pipe(
    pluck<UserSearchListResult, number>('total_count'),
    startWith(0)
  );

  readonly form: FormGroup = this.formBuilder.group({
    userName: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userSearchService: UserSearchService
  ) {}

  triggerSearch(isSearching: boolean): void {
    this.searchAction.next(isSearching ? 'STOP' : 'START');
  }

  onPagination(page: PageEvent): void {
    this.pagination.next(page);
  }
}
