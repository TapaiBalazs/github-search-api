import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { UserSearchServicesModule } from './services/user-search-services.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchResultsTableComponent } from './components/search-results-table/search-results-table.component';
import { UserDetailsComponent } from './components/user-detail/user-details.component';
import { SearchFilterFormComponent } from './components/search-filter-form/search-filter-form.component';

@NgModule({
  declarations: [SearchPageComponent, SearchResultsTableComponent, UserDetailsComponent, SearchFilterFormComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule,
    MatProgressBarModule,
    UserSearchServicesModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SearchModule {}
