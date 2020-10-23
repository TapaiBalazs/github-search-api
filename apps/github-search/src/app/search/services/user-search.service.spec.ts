/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { skip, take } from 'rxjs/operators';
import {
  MOCK_USER_1,
  MOCK_USER_2,
  MOCK_USER_DETAIL_1,
  MOCK_USER_SEARCH_RESULT,
} from '../test-resources/search-results.test-data';
import { UserSearchServicesModule } from './user-search-services.module';
import { UserSearchService } from './user-search.service';

const API_URL_BASE = `https://api.github.com/search/users?q=type:user`;

const MOCK_PAGE_OBJECT: PageEvent = {
  pageSize: 10,
  pageIndex: 0,
  length: 200,
  previousPageIndex: 0,
};
const PAGED_APU_URL = `${API_URL_BASE}&per_page=${
  MOCK_PAGE_OBJECT.pageSize
}&page=${MOCK_PAGE_OBJECT.pageIndex + 1}`;

describe('UserSearchService', () => {
  let service: UserSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserSearchServicesModule, HttpClientTestingModule],
    });
    service = TestBed.inject(UserSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it(
    `'search' method should call the Github API user search url`,
    waitForAsync(() => {
      service.search(MOCK_PAGE_OBJECT).subscribe((result) => {
        expect(result.incomplete_results).toBe(false);
        expect(result.total_count).toBe(2);
        expect(result.items[0]).toEqual(MOCK_USER_1);
        expect(result.items[1]).toEqual(MOCK_USER_2);
      });

      httpMock
        .expectOne(
          { method: 'GET', url: PAGED_APU_URL },
          `${PAGED_APU_URL} should have been called once`
        )
        .flush(MOCK_USER_SEARCH_RESULT);
    })
  );

  it(
    `selectedUser$ is null by default`,
    waitForAsync(() => {
      service.selectedUser$
        .pipe(take(1))
        .subscribe((user) => expect(user).toBe(null));
    })
  );

  it(
    `'fetchUserDetails' method retrieves the user's information and sets it as the selected user`,
    waitForAsync(() => {
      service.selectedUser$
        .pipe(skip(1), take(1))
        .subscribe((user) => expect(user).toBe(MOCK_USER_DETAIL_1));

      service.fetchUserDetails(MOCK_USER_1);

      httpMock
        .expectOne(
          { method: 'GET', url: MOCK_USER_1.url },
          `${MOCK_USER_1.url} should have been called once`
        )
        .flush(MOCK_USER_DETAIL_1);
    })
  );
});
