// import classFeed from "../../../temp/classFeed";
import classes from "../../pages/classes";
import homepage from "../../pages/homepage";
import joinClassModal from "../../pages/joinClassModal";
import joinClassPopUpMessage from "../../pages/joinClassPopUpMessage";
import sidebar from "../../pages/sidebar";

context("Student join a class", () => {
  context("Using account having joined no classes", function () {
    const self = this;
    beforeEach(() => {
      cy.visit(`${Cypress.config("studentClientBaseUrl")}/${Cypress.env("login_url")}`);

      cy.fixture("student/student-no-classes.json").then((data) => {
        cy.login(data.username, data.password);
      });

      cy.url().should("include", Cypress.env("home_url"));

      // set up fixtures
      cy.fixture("student/successful-join-with-code-response1.json").then((response) => {
        self.joinResponse = response;
      });

      cy.fixture("student/get-class-details-response1.json").then((response) => {
        self.classDetailsResponse = response;
      });

      cy.fixture("student/get-class-reviews-response1.json").then((response) => {
        self.allClassReviewsResponse = response;
      });

      cy.fixture("student/valid-class-slug.json").then((data) => {
        self.slug = data.slug;
      });
    });

    const joinClass = function (pageToJoinFrom) {
      cy.intercept("POST", "/v1/classes/join-with-code/", (req) => {
        req.reply({
          statusCode: 200,
          body: self.joinResponse,
        });
      });

      cy.intercept("GET", `/v1/classes/${self.slug}`, (req) => {
        req.reply({
          statusCode: 200,
          body: self.classDetailsResponse,
        });
      });

      cy.intercept("GET", `/v1/review/${self.slug}`, (req) => {
        req.reply({
          statusCode: 200,
          body: self.allClassReviewsResponse,
        });
      });

      if (pageToJoinFrom === "homepage") {
        homepage.clickGetStartedBtn();
        homepage.clickJoinAClassDiv();
      } else if (pageToJoinFrom === "classes") {
        sidebar.clickClassesLink();
        classes.clickPlusBtn();
      }

      cy.fixture("student/valid-class-invite-code.json").then((data) => {
        self.inviteCode = data.inviteCode;
        joinClassModal.typeInviteCode(self.inviteCode);
      });
      joinClassModal.clickJoinBtn();

      joinClassPopUpMessage.checkJoinClassSuccess();
      cy.url().should("include", `${Cypress.env("class_feed_url")}${self.slug}`);
    };

    it("Join class using valid invite code from home page", function () {
      joinClass("homepage");
    });

    it("Join class using valid invite code from classes page", function () {
      joinClass("classes");
    });
  });
});
