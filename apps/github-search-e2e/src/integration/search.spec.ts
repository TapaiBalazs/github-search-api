/* eslint-disable sonarjs/no-duplicate-string */
describe(`Search`, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it(`The search results are empty when opening the page`, () => {
    cy.get(`[data-test-id="data-table-empty-message"]`)
      .should('be.visible')
      .and('contain', 'No users match your search criteria.');
  });

  it(`writing in the form dynamically updates the query`, () => {
    cy.get(`[data-test-id="login"]`).should('be.visible').clear().type('tapai');
    cy.get(`[data-test-id="query-message"]`)
      .should('be.visible')
      .and('contain', 'The query used for searching: ?q=type:user+tapai in:login');
  });

  it(`user can create complex queries`, () => {
    cy.get(`[data-test-id="location"]`).should('be.visible').clear().type('szeged');
    cy.get(`[data-test-id="query-message"]`)
      .should('be.visible')
      .and('contain', 'The query used for searching: ?q=type:user+location:szeged');
    cy.get(`[data-test-id="name"]`).should('be.visible').clear().type('Balázs');
    cy.get(`[data-test-id="query-message"]`)
      .should('be.visible')
      .and('contain', 'The query used for searching: ?q=type:user+Balázs in:name+location:szeged');
  });

  it(`user can search with pressing ENTER and then they can interact with the search results table`, () => {
    cy.get(`[data-test-id="login"]`).should('be.visible').clear().type('tapai{enter}');
    cy.get(`[data-test-id="query-message"]`)
      .should('be.visible')
      .and('contain', 'The query used for searching: ?q=type:user+tapai in:login');
    cy.get(`[data-test-id="TapaiBalazs"]`).should('be.visible').click();
    cy.get(`[data-test-id="user-name"]`).should('be.visible').and('contain', 'Tápai Balázs');
    cy.get(`[data-test-id="user-joined"]`).should('be.visible').and('contain', 'TapaiBalazs joined Jul 17, 2015');

    cy.get(`.mat-paginator-navigation-next > .mat-button-wrapper > .mat-paginator-icon`).should('be.visible').click();
    cy.get(`[data-test-id="TapaiBalazs"]`).should('not.be.visible');
  });
});
