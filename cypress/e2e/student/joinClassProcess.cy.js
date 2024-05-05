// import classFeed from "../../../temp/classFeed";
import classFeed from "../../pages/student/classFeed";
import classes from "../../pages/student/classes";
import homepage from "../../pages/student/homepage";
import joinClassModal from "../../pages/student/joinClassModal";
import joinClassPopUpMessage from "../../pages/student/joinClassPopUpMessage";
import sidebar from "../../pages/sidebar";

export function interceptJoinClass(joinResponse, classDetailsResponse, allClassReviewsResponse, classSlug) {
  cy.intercept("POST", "/v1/classes/join-with-code/", (req) => {
    req.reply({
      statusCode: 200,
      body: joinResponse,
    });
  });

  cy.log("slug: " + classSlug);

  cy.intercept("GET", `/v1/classes/${classSlug}`, (req) => {
    req.reply({
      statusCode: 200,
      body: classDetailsResponse,
    });
  });

  cy.intercept("GET", `/v1/review/${classSlug}`, (req) => {
    req.reply({
      statusCode: 200,
      body: allClassReviewsResponse,
    });
  });
}

export const joinClass = function (pageToJoinFrom, inviteCode, classSlug) {
  if (pageToJoinFrom === "homepage") {
    homepage.clickGetStartedBtn().clickJoinAClassDiv();
  } else if (pageToJoinFrom === "classes") {
    sidebar.clickClassesLink();
    classes.clickPlusBtn();
  }

  joinClassModal.typeInviteCode(inviteCode);

  joinClassModal.clickJoinBtn();

  joinClassPopUpMessage.checkJoinClassSuccess();
  cy.url().should("include", `${Cypress.env("class_feed_url")}${classSlug}`);
};
context("Student join a class", function () {
  let interceptData; // created this so the inner function can access

  context("Using account having joined no classes", function () {
    const self = this;
    beforeEach(() => {
      cy.visit(`${Cypress.config("studentClientBaseUrl")}/${Cypress.env("login_url")}`);

      cy.fixture("student/student-no-classes.json").then((data) => {
        cy.login(data.username, data.password);
      });

      cy.url().should("include", Cypress.env("home_url"));

      // load fixtures
      cy.fixture("student/successful-join-with-code-response1.json").then((response) => {
        this.joinResponse = response;
        cy.fixture("student/get-class-details-response1.json").then((response) => {
          this.classDetailsResponse = response;
          cy.fixture("get-class-reviews-response1.json").then((response) => {
            this.allClassReviewsResponse = response;
            cy.fixture("student/valid-class-slug.json").then((data) => {
              self.slug = data.slug;
              interceptJoinClass(this.joinResponse, this.classDetailsResponse, this.allClassReviewsResponse, self.slug);
            });
          });
        });
      });

      cy.fixture("student/valid-class-invite-code.json").then((data) => {
        self.inviteCode = data.inviteCode;
      });
    });

    it.only("should allow joining class using valid invite code from home page", function () {
      joinClass("homepage", self.inviteCode, self.slug);
    });

    it.only("should allow joining class using valid invite code from classes page", function () {
      joinClass("classes", self.inviteCode, self.slug);
    });
  });

  context("Using account having joined at least 1 class", function () {
    const self = this;
    beforeEach(() => {
      interceptData = this;

      cy.visit(`${Cypress.config("studentClientBaseUrl")}/${Cypress.env("login_url")}`);

      cy.fixture("student/student-with-classes.json").then((data) => {
        cy.login(data.username, data.password);
      });

      cy.url().should("include", Cypress.env("home_url"));

      // load fixtures
      cy.fixture("student/successful-join-with-code-response2.json").then((joinResponse) => {
        this.joinResponse = joinResponse;
        cy.fixture("student/get-class-details-response2.json").then((response) => {
          this.classDetailsResponse = response;
          cy.fixture("get-class-reviews-response1.json").then((response) => {
            this.allClassReviewsResponse = response;
            cy.fixture("student/valid-class-slug2.json").then((data) => {
              this.slug = data.slug;
              interceptJoinClass(this.joinResponse, this.classDetailsResponse, this.allClassReviewsResponse, this.slug);
            });
          });
        });
      });
    });

    it("Join class with valid code with account joining at least 1 class", function () {
      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/valid-class-invite-code2.json").then((data) => {
        cy.log(data.inviteCode);
        joinClassModal.typeInviteCode(data.inviteCode);
        joinClassModal.clickJoinBtn();

        joinClassPopUpMessage.checkJoinClassSuccess();
        cy.url().should("include", `${Cypress.env("class_feed_url")}${interceptData.slug}`);
        classFeed.studentIDPopUp.container().should("be.visible");
      });
    });

    it("check cancel joining class", function () {
      homepage.click3Dots().clickJoinAClassUl();
      joinClassModal.clickCancelBtn();
      joinClassModal.checkContainerInvisible();
    });

    it("should show error message when joining Class with Invite Code that consists of all lowercase letters", function () {
      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/invalid-class-invite-code1").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });

      joinClassModal.clickJoinBtn();
      cy.wait(200);
      joinClassModal.checkErrorMessageInvalidCodeVisible();
    });

    it("should show error message when joining Class with Invite Code that consists of identical characters", function () {
      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/invalid-class-invite-code2").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });

      joinClassModal.clickJoinBtn();
      joinClassModal.checkErrorMessageInvalidCodeVisible();
    });

    it("should show error message when joining Class with Invite Code that consists of special characters only", function () {
      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/invalid-class-invite-code3").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });

      joinClassModal.clickJoinBtn();
      cy.wait(200);

      joinClassModal.checkErrorMessageInvalidCodeVisible();
    });

    it("should show error message when joining Class with Invite Code that consists of numeric characters only", function () {
      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/invalid-class-invite-code4").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });

      joinClassModal.clickJoinBtn();
      cy.wait(200);

      joinClassModal.checkErrorMessageInvalidCodeVisible();
    });

    it("should show error message when joining Class with Invite Code of Incorrect Length (Not 7 Characters)", function () {
      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/invalid-class-invite-code5").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });

      joinClassModal.clickJoinBtn();
      cy.wait(200);

      joinClassModal.checkErrorMessageInvalidCodeVisible();
    });

    it("should show error message when joining Class with Empty Invite Code", function () {
      homepage.click3Dots().clickJoinAClassUl();

      joinClassModal.clickJoinBtn();
      cy.wait(200);

      joinClassModal.checkErrorMessageEmptyCode();
    });

    it("should show error message when rejoining a class", function () {
      homepage.click3Dots().clickJoinAClassUl();

      cy.fixture("student/valid-class-invite-code3").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });
      joinClassModal.clickJoinBtn();
      joinClassModal.checkErrorMessageRejoiningClass();
    });
  });
});
