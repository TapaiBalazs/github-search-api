import { marbles } from 'rxjs-marbles';
import { buildQuery } from './query-builder.util';

describe(`QueryBuilder`, () => {
  it(
    `Defaults a 'null' value to '?q=type:user'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: null });
      const expect$ = m.cold('-x--', { x: '?q=type:user' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'login' property to '?q=type:user+test in:login'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { login: 'test' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+test in:login' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'email' property to '?q=type:user+test in:email'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { email: 'test' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+test in:email' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'name' property to '?q=type:user+test in:name'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { name: 'test' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+test in:name' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'repos' and 'repoQualifier (Greater Than)' properties to '?q=type:user+repos:>10'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { repos: 10, repoQualifier: 'GT' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+repos:>10' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'repos' and 'repoQualifier (Less Than)' properties to '?q=type:user+repos:>10'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { repos: 10, repoQualifier: 'LT' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+repos:<10' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'location' property to '?q=type:user+location:San Francisco'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { location: 'San Francisco' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+location:San Francisco' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'followers' and 'followerQualifier (Greater Than)' properties to '?q=type:user+followers:>10'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { followers: 10, followerQualifier: 'GT' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+followers:>10' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'followers' and 'followersQualifier (Less Than)' properties to '?q=type:user+followers:>10'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { followers: 10, followerQualifier: 'LT' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+followers:<10' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'followers' and 'followerQualifier (Greater Than or Equals)' properties to '?q=type:user+followers:>10'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { followers: 10, followerQualifier: 'GTOE' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+followers:>=10' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'followers' and 'followersQualifier (Less Than or Equals)' properties to '?q=type:user+followers:>10'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { followers: 10, followerQualifier: 'LTOE' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+followers:<=10' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'created' and 'createdQualifier (Greater Than)' properties to '?q=type:user+repos:>10'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { created: new Date('2020-10-23'), createdQualifier: 'GT' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+created:>2020-10-23' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );

  it(
    `Builds a query for the 'created' and 'createdQualifier (Less Than)' properties to '?q=type:user+repos:>10'`,
    marbles((m) => {
      const source$ = m.hot('-a--', { a: { created: new Date('2020-01-03'), createdQualifier: 'LT' } });
      const expect$ = m.cold('-x--', { x: '?q=type:user+created:<2020-01-03' });

      m.expect(source$.pipe(buildQuery())).toBeObservable(expect$);
    })
  );
});
