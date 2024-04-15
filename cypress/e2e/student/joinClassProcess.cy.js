// import classFeed from "../../../temp/classFeed";
import homepage from "../../pages/homepage";
import joinClassModal from "../../pages/joinClassModal";
import joinClassPopUpMessage from "../../pages/joinClassPopUpMessage";

context("Student join a class", () => {
  context("Using account having joined no classes", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/auth/login");

      cy.fixture("student/student-no-classes.json").then((data) => {
        cy.login(data.username, data.password);
      });

      cy.url().should("include", "/home");
    });
    it("Join class using valid invite code from home page", function () {
      cy.fixture("student/successful-join-with-code-response1.json").then((response) => {
        this.joinResponse = response;
      });

      cy.fixture("student/get-class-details-response1.json").then((response) => {
        this.classDetailsResponse = response;
      });

      cy.fixture("student/get-class-reviews-response1.json").then((response) => {
        this.allClassReviewsResponse = response;
      });

      cy.intercept("POST", "/v1/classes/join-with-code/", (req) => {
        req.reply({
          statusCode: 200,
          body: this.joinResponse,
        });
      });

      cy.fixture("student/invite-code-valid").then((data) => {
        this.slug = data.slug;
        this.inviteCode = data.inviteCode;

        cy.log(`/v1/classes/${this.slug}/`);
        cy.intercept("GET", `/v1/classes/${this.slug}`, (req) => {
          req.reply({
            statusCode: 200,
            body: this.classDetailsResponse,
          });
        });

        cy.intercept("GET", `/v1/review/${this.slug}`, (req) => {
          req.reply({
            statusCode: 200,
            body: this.allClassReviewsResponse,
          });
        });

        homepage.clickGetStartedBtn();
        homepage.clickJoinAClassDiv();

        joinClassModal.typeInviteCode(this.inviteCode);
        joinClassModal.clickJoinBtn();

        joinClassPopUpMessage.checkJoinClassSuccess();
        cy.url().should("include", `/classes/feeds/${this.slug}`);

        // classFeed.studentIDPopUp.container().should("be.visible");
      });
    });
  });
});
