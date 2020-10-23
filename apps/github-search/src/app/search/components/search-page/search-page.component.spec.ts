/* eslint-disable @typescript-eslint/no-unused-vars */
import { waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { DEFAULT_PAGINATION_STATE } from '../../constants/pagination.constants';
import { SearchPageComponent } from './search-page.component';

const MOCK_USER_SEARCH_SERVICE = {
  search: jest.fn(),
  searchProgress$: of(0)
};

const MOCK_PAGINATION_EVENT_1 = { length: 200, pageIndex: 2, pageSize: 30, previousPageIndex: 1 }
const MOCK_PAGINATION_EVENT_2 = { length: 200, pageIndex: 3, pageSize: 30, previousPageIndex: 2 }

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;

  beforeEach(() => {
    component = new SearchPageComponent(MOCK_USER_SEARCH_SERVICE as never);
  });

  it(`'triggerSearch' should call search in the 'UserSearchService'`, waitForAsync(() => {
    MOCK_USER_SEARCH_SERVICE.search.mockReturnValue(of({}));

    component.searchResults$.pipe(take(1)).subscribe((_) => {
      expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledTimes(1);
      expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledWith(DEFAULT_PAGINATION_STATE);
    });

    component.triggerSearch();
  }));

  it(`setting the paginator should only call search if there has been a search action`, waitForAsync(() => {
    MOCK_USER_SEARCH_SERVICE.search.mockReturnValue(of({}));

    component.searchResults$.pipe(take(1)).subscribe((_) => {
      expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledTimes(1);
      expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledWith(MOCK_PAGINATION_EVENT_2);
    });

    component.onPagination(MOCK_PAGINATION_EVENT_1);
    component.onPagination(MOCK_PAGINATION_EVENT_2);

    component.triggerSearch();
  }));

  it(`after a search action, changing page size or navigation triggers another search request`, waitForAsync(() => {
    MOCK_USER_SEARCH_SERVICE.search.mockReturnValue(of({}));

    component.searchResults$.pipe(skip(2), take(1)).subscribe((_) => {
      expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledTimes(3);
      expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenNthCalledWith(1, DEFAULT_PAGINATION_STATE);
      expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenNthCalledWith(2, MOCK_PAGINATION_EVENT_1);
      expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenNthCalledWith(3, MOCK_PAGINATION_EVENT_2);
    });

    component.triggerSearch();
    component.onPagination(MOCK_PAGINATION_EVENT_1);
    component.onPagination(MOCK_PAGINATION_EVENT_2);

  }));
});
