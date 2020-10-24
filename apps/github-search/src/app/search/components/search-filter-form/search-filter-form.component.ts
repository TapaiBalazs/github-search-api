import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { RawSearchForm, SearchButtonEvent } from '../../interfaces/search-form.interfaces';
import { UserSearchService } from '../../services/user-search.service';

@Component({
  selector: 'githubsearch-search-filter-form',
  templateUrl: './search-filter-form.component.html',
  styleUrls: ['./search-filter-form.component.css'],
})
export class SearchFilterFormComponent implements OnInit, OnDestroy {
  private valueChangesSub: Subscription;

  @Input()
  isSearchInProgress = false;

  @Output()
  readonly triggerSearch = new EventEmitter<SearchButtonEvent>();

  readonly form = this.formBuilder.group({
    login: [''],
    name: [''],
    email: [''],
    location: [''],
    repos: [null],
    repoQualifier: ['GT', Validators.required],
    followers: [null],
    followerQualifier: ['GT', Validators.required],
    created: [null],
    createdQualifier: ['LT', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private userSearchService: UserSearchService) {}

  ngOnInit(): void {
    this.valueChangesSub = this.form.valueChanges
      .pipe(startWith(this.form.getRawValue() as RawSearchForm))
      .subscribe((value) => this.userSearchService.setFilter(value));
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  searchButtonClicked(isSearchInProgress: boolean): void {
    this.triggerSearch.next({
      isSearchInProgress,
      formIsDirty: this.form.dirty,
    });
    this.form.markAsPristine();
  }
}
