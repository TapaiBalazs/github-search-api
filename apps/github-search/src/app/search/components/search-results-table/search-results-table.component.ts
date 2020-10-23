import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserSearchListItem } from '../../interfaces/user-search.interfaces';
import { UserSearchService } from '../../services/user-search.service';

@Component({
  selector: 'githubsearch-search-results-table',
  templateUrl: './search-results-table.component.html',
  styleUrls: ['./search-results-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsTableComponent {
  @Input()
  users: UserSearchListItem[] = [];

  readonly displayedColumns = ['login', 'id', 'viewOnGithub', 'userDetails'];
  readonly emptyGridcolumns = ['noRecord'];

  constructor(private userSearchService: UserSearchService) {}

  openDetails(user: UserSearchListItem): void {
    this.userSearchService.fetchUserDetails(user);
  }
}
