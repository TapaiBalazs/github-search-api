import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserSearchListItem } from '../../interfaces/user-search.interfaces';

@Component({
  selector: 'githubsearch-search-results-table',
  templateUrl: './search-results-table.component.html',
  styleUrls: ['./search-results-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsTableComponent {

  @Input()
  users: UserSearchListItem[] = [];

  readonly displayedColumns = ['id',  'login']

}
