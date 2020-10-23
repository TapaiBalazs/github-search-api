import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDetail } from '../../interfaces/user-search.interfaces';

@Component({
  selector: 'githubsearch-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  @Input()
  user: UserDetail;
}
