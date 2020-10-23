import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { UserSearchServicesModule } from './components/services/user-search-services.module';
import { SearchRoutingModule } from './search-routing.module';


@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatButtonModule,
    MatProgressBarModule,
    UserSearchServicesModule
  ]
})
export class SearchModule {
}
