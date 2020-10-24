/* eslint-disable sonarjs/no-duplicate-string */
describe(`Encoundering Errors`, () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/');
    cy.route2(
      {
        method: 'GET',
        url: 'https://api.github.com/search/users?q=type:user&per_page=10&page=1',
      },
      {
        statusCode: 403,
      }
    ).as('rateLimitError');
  });

  it(`When the API call returns with an error, the error message is displayed to the user`, () => {
    cy.get(`[data-test-id="query-message"]`)
      .should('be.visible')
      .and('contain', 'The query used for searching: ?q=type:user');

    cy.get(`[data-test-id="search-button"]`).should('be.visible').click();
    cy.wait('@rateLimitError');
    cy.get(`[data-test-id="error-message"]`)
      .should('be.visible')
      .and(
        'contain',
        'Http failure response for https://api.github.com/search/users?q=type:user&per_page=10&page=1: 403 Forbidden'
      );
  });
});
