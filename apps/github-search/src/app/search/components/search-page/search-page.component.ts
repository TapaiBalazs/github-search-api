import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserSearchService } from '../services/user-search.service';

@Component({
  selector: 'githubsearch-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  private readonly searchAction = new Subject();
  readonly searchResults$ = this.searchAction.asObservable()
    .pipe(
      switchMap(_ => this.userSearchService.search())
    );
  readonly searchProgress$: Observable<number> = this.userSearchService.searchProgress$

  constructor(private userSearchService: UserSearchService) {
  }

  triggerSearch(): void {
    this.searchAction.next();
  }

}
