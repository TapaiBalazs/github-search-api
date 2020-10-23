import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { RawSearchForm } from '../../interfaces/search-form.interfaces';
import { UserSearchService } from '../../services/user-search.service';

@Component({
  selector: 'githubsearch-search-filter-form',
  templateUrl: './search-filter-form.component.html',
  styleUrls: ['./search-filter-form.component.css'],
})
export class SearchFilterFormComponent implements OnInit, OnDestroy {
  private valueChangesSub: Subscription;

  readonly form = this.formBuilder.group({
    login: [''],
    name: [''],
    email: [''],
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
}
