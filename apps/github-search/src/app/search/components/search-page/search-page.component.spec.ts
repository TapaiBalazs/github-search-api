/* eslint-disable @typescript-eslint/no-unused-vars,sonarjs/no-identical-functions */
import { waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { delay, skip, take } from 'rxjs/operators';
import { DEFAULT_PAGINATION_STATE } from '../../constants/pagination.constants';
import { SearchPageComponent } from './search-page.component';

const MOCK_USER_SEARCH_SERVICE = {
  search: jest.fn(),
  searchProgress$: of(0),
};

const MOCK_PAGINATION_EVENT_1 = {
  length: 200,
  pageIndex: 2,
  pageSize: 30,
  previousPageIndex: 1,
};

const MOCK_PAGINATION_EVENT_2 = {
  length: 200,
  pageIndex: 3,
  pageSize: 30,
  previousPageIndex: 2,
};

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;

  beforeEach(() => {
    component = new SearchPageComponent(MOCK_USER_SEARCH_SERVICE as never);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it(
    `the searchResults are set to an empty array by default`,
    waitForAsync(() => {
      component.searchResults$.pipe(take(1)).subscribe((result) => {
        expect(MOCK_USER_SEARCH_SERVICE.search).not.toHaveBeenCalled();
        expect(result.items.length).toEqual(0);
      });
    })
  );

  it(
    `'triggerSearch' should call 'search' method in the 'UserSearchService'`,
    waitForAsync(() => {
      MOCK_USER_SEARCH_SERVICE.search.mockReturnValue(of({ items: [{ login: 'shouldreach' }] }));

      component.searchResults$.pipe(skip(1), take(1)).subscribe((result) => {
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledTimes(1);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledWith(DEFAULT_PAGINATION_STATE);
        expect(result.items.length).toEqual(1);
        expect(result.items[0].login).toEqual('shouldreach');
      });

      component.triggerSearch({ isSearchInProgress: false, formIsDirty: false });
    })
  );

  it(
    `'triggerSearch' should return the previous cached value if the search request returns an error`,
    waitForAsync(() => {
      MOCK_USER_SEARCH_SERVICE.search.mockReturnValue(throwError(new Error('Rate limit exceeded')));

      component.searchResults$.pipe(skip(1), take(1)).subscribe((result) => {
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledTimes(1);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledWith(DEFAULT_PAGINATION_STATE);
        expect(result.items.length).toEqual(0);
      });

      component.triggerSearch({ isSearchInProgress: false, formIsDirty: false });
    })
  );

  it(
    `when a search request takes too long, the user can cancel the request`,
    waitForAsync(() => {
      MOCK_USER_SEARCH_SERVICE.search.mockReturnValue(of({ items: [{ login: 'shouldnotreach' }] }).pipe(delay(1000)));

      component.searchResults$.pipe(skip(1), take(1)).subscribe((result) => {
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledTimes(1);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledWith(DEFAULT_PAGINATION_STATE);
        expect(result.items.length).toEqual(0);
      });

      component.triggerSearch({ isSearchInProgress: false, formIsDirty: false });
      component.triggerSearch({ isSearchInProgress: true, formIsDirty: false });
    })
  );

  it(
    `setting the paginator should only call search if there has been a search action`,
    waitForAsync(() => {
      MOCK_USER_SEARCH_SERVICE.search.mockReturnValue(of({}));

      component.searchResults$.pipe(skip(1), take(1)).subscribe((_) => {
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledTimes(1);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledWith(MOCK_PAGINATION_EVENT_2);
      });

      component.onPagination(MOCK_PAGINATION_EVENT_1);
      component.onPagination(MOCK_PAGINATION_EVENT_2);

      component.triggerSearch({ isSearchInProgress: false, formIsDirty: false });
    })
  );

  it(
    `after a search action, changing page size or navigation triggers another search request`,
    waitForAsync(() => {
      MOCK_USER_SEARCH_SERVICE.search.mockReturnValue(of({}));

      component.searchResults$.pipe(skip(3), take(1)).subscribe((_) => {
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledTimes(3);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenNthCalledWith(1, DEFAULT_PAGINATION_STATE);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenNthCalledWith(2, MOCK_PAGINATION_EVENT_1);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenNthCalledWith(3, MOCK_PAGINATION_EVENT_2);
      });

      component.triggerSearch({ isSearchInProgress: false, formIsDirty: false });
      component.onPagination(MOCK_PAGINATION_EVENT_1);
      component.onPagination(MOCK_PAGINATION_EVENT_2);
    })
  );

  it(
    `after a search action, when searching again with a changed query, the pagination pageIndex should be set to zero`,
    waitForAsync(() => {
      MOCK_USER_SEARCH_SERVICE.search.mockReturnValue(of({}));

      component.searchResults$.pipe(skip(4), take(1)).subscribe((_) => {
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledTimes(4);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenNthCalledWith(1, DEFAULT_PAGINATION_STATE);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenNthCalledWith(2, MOCK_PAGINATION_EVENT_1);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenNthCalledWith(3, MOCK_PAGINATION_EVENT_2);
        expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenNthCalledWith(4, {
          ...DEFAULT_PAGINATION_STATE,
          pageSize: MOCK_PAGINATION_EVENT_2.pageSize,
        });
      });

      component.triggerSearch({ isSearchInProgress: false, formIsDirty: false });
      component.onPagination(MOCK_PAGINATION_EVENT_1);
      component.onPagination(MOCK_PAGINATION_EVENT_2);
      component.triggerSearch({ isSearchInProgress: false, formIsDirty: true });
    })
  );
});
