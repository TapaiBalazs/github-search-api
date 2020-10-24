import { Component } from '@angular/core';
import { UserSearchService } from '../../services/user-search.service';

@Component({
  selector: 'githubsearch-search-messages',
  templateUrl: './search-messages.component.html',
  styleUrls: ['./search-messages.component.css'],
})
export class SearchMessagesComponent {
  readonly query$ = this.userSearchService.query$;
  readonly error$ = this.userSearchService.error$;

  constructor(private userSearchService: UserSearchService) {}
}
