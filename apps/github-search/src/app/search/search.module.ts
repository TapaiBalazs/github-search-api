import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { SearchFilterFormComponent } from './components/search-filter-form/search-filter-form.component';
import { SearchMessagesComponent } from './components/search-messages/search-messages.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchResultsTableComponent } from './components/search-results-table/search-results-table.component';
import { UserDetailsComponent } from './components/user-detail/user-details.component';
import { SearchRoutingModule } from './search-routing.module';
import { UserSearchServicesModule } from './services/user-search-services.module';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchResultsTableComponent,
    UserDetailsComponent,
    SearchFilterFormComponent,
    SearchMessagesComponent,
  ],
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class SearchModule {}
