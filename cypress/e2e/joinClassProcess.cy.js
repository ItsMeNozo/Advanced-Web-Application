context("Student join a class", () => {
  context("Lecturer copies invite code", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3001/auth/login");
    });

    it("should sign in", () => {
      cy.fixture("LecturerAccount.json").then((data) => {
        cy.login(data.username, data.password);
      });

      cy.url().should("equal", "http://localhost:3001/home");
    });
  });

  context("Join a class", () => {});
});
