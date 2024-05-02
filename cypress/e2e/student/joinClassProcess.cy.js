// import classFeed from "../../../temp/classFeed";
import classFeed from "../../pages/classFeed";
import classes from "../../pages/classes";
import homepage from "../../pages/homepage";
import joinClassModal from "../../pages/joinClassModal";
import joinClassPopUpMessage from "../../pages/joinClassPopUpMessage";
import sidebar from "../../pages/sidebar";

context("Student join a class", function () {
  let interceptData; // created this so the inner function can access

  function interceptJoinClass() {
    cy.intercept("POST", "/v1/classes/join-with-code/", (req) => {
      req.reply({
        statusCode: 200,
        body: interceptData.joinResponse,
      });
    });

    cy.log("slug: " + interceptData.slug);

    cy.intercept("GET", `/v1/classes/${interceptData.slug}`, (req) => {
      req.reply({
        statusCode: 200,
        body: interceptData.classDetailsResponse,
      });
    });

    cy.intercept("GET", `/v1/review/${interceptData.slug}`, (req) => {
      req.reply({
        statusCode: 200,
        body: interceptData.allClassReviewsResponse,
      });
    });
  }
  context("Using account having joined no classes", function () {
    const self = this;
    beforeEach(() => {
      interceptData = this;
      cy.visit(`${Cypress.config("studentClientBaseUrl")}/${Cypress.env("login_url")}`);

      cy.fixture("student/student-no-classes.json").then((data) => {
        cy.login(data.username, data.password);
      });

      cy.url().should("include", Cypress.env("home_url"));

      // load fixtures
      cy.fixture("student/successful-join-with-code-response1.json").then((response) => {
        interceptData.joinResponse = response;
      });

      cy.fixture("student/get-class-details-response1.json").then((response) => {
        interceptData.classDetailsResponse = response;
      });

      cy.fixture("student/get-class-reviews-response1.json").then((response) => {
        interceptData.allClassReviewsResponse = response;
      });

      cy.fixture("student/valid-class-slug.json").then((data) => {
        interceptData.slug = data.slug;
      });
    });

    const joinClass = function (pageToJoinFrom) {
      interceptJoinClass();

      if (pageToJoinFrom === "homepage") {
        homepage.clickGetStartedBtn().clickJoinAClassDiv();
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
      cy.url().should("include", `${Cypress.env("class_feed_url")}${interceptData.slug}`);
    };

    it("should allow joining class using valid invite code from home page", function () {
      joinClass("homepage");
    });

    it("should allow joining class using valid invite code from classes page", function () {
      joinClass("classes");
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
      cy.fixture("student/successful-join-with-code-response2.json").then((response) => {
        self.joinResponse = response;
      });

      cy.fixture("student/get-class-details-response2.json").then((response) => {
        self.classDetailsResponse = response;
      });

      cy.fixture("student/get-class-reviews-response1.json").then((response) => {
        self.allClassReviewsResponse = response;
      });

      cy.fixture("student/valid-class-slug2.json").then((data) => {
        interceptData.slug = data.slug;
      });
    });

    it("Join class with valid code with account joining at least 1 class", function () {
      interceptJoinClass();

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
      interceptJoinClass();

      homepage.click3Dots().clickJoinAClassUl();
      joinClassModal.clickCancelBtn();
      joinClassModal.checkContainerInvisible();
    });

    it("should show error message when joining Class with Invite Code that consists of all lowercase letters", function () {
      interceptJoinClass();

      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/invalid-class-invite-code1").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });

      joinClassModal.clickJoinBtn();
      cy.wait(200);
      joinClassModal.checkErrorMessageInvalidCodeVisible();
    });

    it("should show error message when joining Class with Invite Code that consists of identical characters", function () {
      interceptJoinClass();

      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/invalid-class-invite-code2").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });

      joinClassModal.clickJoinBtn();
      joinClassModal.checkErrorMessageInvalidCodeVisible();
    });

    it("should show error message when joining Class with Invite Code that consists of special characters only", function () {
      interceptJoinClass();

      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/invalid-class-invite-code3").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });

      joinClassModal.clickJoinBtn();
      cy.wait(200);

      joinClassModal.checkErrorMessageInvalidCodeVisible();
    });

    it("should show error message when joining Class with Invite Code that consists of numeric characters only", function () {
      interceptJoinClass();

      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/invalid-class-invite-code4").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });

      joinClassModal.clickJoinBtn();
      cy.wait(200);

      joinClassModal.checkErrorMessageInvalidCodeVisible();
    });

    it("should show error message when joining Class with Invite Code of Incorrect Length (Not 7 Characters)", function () {
      interceptJoinClass();

      homepage.click3Dots().clickJoinAClassUl();
      cy.fixture("student/invalid-class-invite-code5").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });

      joinClassModal.clickJoinBtn();
      cy.wait(200);

      joinClassModal.checkErrorMessageInvalidCodeVisible();
    });

    it("should show error message when joining Class with Empty Invite Code", function () {
      interceptJoinClass();

      homepage.click3Dots().clickJoinAClassUl();

      joinClassModal.clickJoinBtn();
      cy.wait(200);

      joinClassModal.checkErrorMessageEmptyCode();
    });

    it.only("should show error message when rejoining a class", function () {
      homepage.click3Dots().clickJoinAClassUl();

      cy.fixture("student/valid-class-invite-code3").then((data) => {
        joinClassModal.typeInviteCode(data.inviteCode);
      });
      joinClassModal.clickJoinBtn();
      joinClassModal.checkErrorMessageRejoiningClass();
    });
  });
});
