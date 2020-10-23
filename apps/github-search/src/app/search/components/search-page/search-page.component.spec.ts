import { of } from 'rxjs';
import { SearchPageComponent } from './search-page.component';

const MOCK_USER_SEARCH_SERVICE = {
  search: jest.fn(),
  searchProgress$: of(0)
}

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;

  beforeEach(() => {
    component = new SearchPageComponent(MOCK_USER_SEARCH_SERVICE as any);
  });

  it(`'triggerSearch should call search in the 'UserSearchService'`, () => {
    MOCK_USER_SEARCH_SERVICE.search.mockReturnValue(of({}))


    component.searchResults$.subscribe((result) => {
      expect(MOCK_USER_SEARCH_SERVICE.search).toHaveBeenCalledTimes(1)
    })

    component.triggerSearch();

  });
});
