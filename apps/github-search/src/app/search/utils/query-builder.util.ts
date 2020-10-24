import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RawSearchForm } from '../interfaces/search-form.interfaces';

export function buildQuery(): (s$: Observable<RawSearchForm>) => Observable<string> {
  return (s$) =>
    s$.pipe(
      map((queryBase: RawSearchForm) =>
        new QueryBuilderUtil(queryBase)
          .withSimpleProperties(['login', 'email', 'name'])
          .withRepos()
          .withLocation()
          .withFollowers()
          .withCreatedDate()
          .getQuery()
      )
    );
}

const QUALIFIERS = new Map().set('GT', '>').set('GTOE', '>=').set('LT', '<').set('LTOE', '<=');

class QueryBuilderUtil {
  private query = '?q=type:user';

  constructor(private queryBase: RawSearchForm) {}

  getQuery(): string {
    return this.query;
  }

  withSimpleProperties(properties: string[]): QueryBuilderUtil {
    if (!this.queryBase) {
      return this;
    } else {
      return properties.reduce((builder: QueryBuilderUtil, current: string) => {
        return builder.withSimpleQuery(current);
      }, this);
    }
  }

  withRepos(): QueryBuilderUtil {
    if (this.queryBase?.repos) {
      const qualifier = QUALIFIERS.get(this.queryBase.repoQualifier);
      this.query += `+repos:${qualifier}${this.queryBase.repos}`;
    }
    return this;
  }

  withFollowers(): QueryBuilderUtil {
    if (this.queryBase?.followers) {
      const qualifier = QUALIFIERS.get(this.queryBase.followerQualifier);
      this.query += `+followers:${qualifier}${this.queryBase.followers}`;
    }
    return this;
  }

  withLocation(): QueryBuilderUtil {
    if (this.queryBase?.location) {
      this.query += `+location:${this.queryBase.location}`;
    }
    return this;
  }

  withCreatedDate(): QueryBuilderUtil {
    if (this.queryBase?.created) {
      const qualifier = QUALIFIERS.get(this.queryBase.createdQualifier);
      const date = this.queryBase.created.toISOString().substr(0, 10);
      this.query += `+created:${qualifier}${date}`;
    }
    return this;
  }

  private withSimpleQuery(propertyName: string): QueryBuilderUtil {
    if (this.queryBase[propertyName]) {
      this.query += `+${this.queryBase[propertyName]} in:${propertyName}`;
    }
    return this;
  }
}
