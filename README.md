# GitHub Search coding challenge

_Acceptance criteria:_
- [x] I can search for u sers and see a paginated list of results
- [x] I can navigate through the next and previous pages of the paginated results
- [x] I see the total count of search results
- [x] I see notable information for each search result, such as the description, star/follower count, profile pictures, etc.
- [x] I can select a search result and be taken to the applicable page on github.com API

## Finished

- [Git Repository](https://github.com/TapaiBalazs/github-search-api)
- [Deployed application](https://tdl-tapaibalazs-github-search.netlify.app/)

### Problems I encountered
- I wanted to display user data directly in the grid, using the `zip` operator and fetching the user data for each search result, but that collided with GitHub's rate limiting, therefore I went with a user detail component.
- If I had more free time, I would have improved the app's layout. Mobile first was not a requirement, the application should look "okay" in `1360*768` resolution or above. I developed it on `1920*1080` resolution.
- I wanted to write more cypress tests, but most of the logic gets tested on unit level already.
- I might have over-engineered it a bit. 😕

I really enjoyed the challenge, and I have learnt some new things along the way. Like how to publish a redirect rule to netlify and Cypress' `route2` method. With the search button I added a little extra, so if a query takes too long it can be cancelled.

## Technologies used:

- [Nx Workspace](https://nx.dev/angular) as the CLI
- [Angular](https://angular.io) framework
- [RxJS](https://rxjs.dev)
- [Angular Material](https://material.angular.io)
- [Jest](https://jestjs.io) for unit tests
- [RxJS marbles](https://www.npmjs.com/package/rxjs-marbles) for marble tests
- [Cypress](https://cypress.io) for automated UI tests

GitHub API used: [v3 REST API](https://docs.github.com/en/free-pro-team@latest/rest/reference/search#search-users)

_Code I did not write, but helped with the implementation:_
- [NgLet Directive](apps/github-search/src/app/shared/directives/ng-let.directive.ts) It is really handy.

