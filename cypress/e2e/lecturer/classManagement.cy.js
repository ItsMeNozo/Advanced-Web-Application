context("Lecturer manages class", function () {
  beforeAll(() => {
    cy.visit(`${Cypress.config("lecturerClientBaseUrl")}/${Cypress.env("login_url")}`);
  });
});
