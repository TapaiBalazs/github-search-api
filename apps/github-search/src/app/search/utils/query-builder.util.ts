import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RawSearchForm } from '../interfaces/search-form.interfaces';

export function buildQuery(): (s$: Observable<RawSearchForm>) => Observable<string> {
  return (s$) =>
    s$.pipe(
      map((queryBase: RawSearchForm) => {
        let query = '';
        if (!queryBase) {
          return query;
        }
        query += '?q=type:user';
        if (queryBase.login) {
          query += `+${queryBase.login} in:login`;
        }
        if (queryBase.email) {
          query += `+${queryBase.email} in:email`;
        }
        if (queryBase.name) {
          query += `+${queryBase.name} in:name`;
        }

        return query;
      })
    );
}
