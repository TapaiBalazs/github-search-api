import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { UserSearchServicesModule } from './services/user-search-services.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchResultsTableComponent } from './components/search-results-table/search-results-table.component';


@NgModule({
  declarations: [SearchPageComponent, SearchResultsTableComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatButtonModule,
    MatProgressBarModule,
    UserSearchServicesModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class SearchModule {
}
