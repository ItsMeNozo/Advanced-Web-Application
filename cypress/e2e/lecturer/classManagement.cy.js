import classFeed from "../../pages/lecturer/classFeed";
import classes from "../../pages/lecturer/classes";
import createClassModal from "../../pages/lecturer/createClassModal";
import createClassPopUpMessage from "../../pages/lecturer/createClassPopUpMessage";
import homepage from "../../pages/lecturer/homepage";
import sidebar from "../../pages/sidebar";
// import { interceptJoinClass, joinClass } from "../student/joinClassProcess.cy";

context("Lecturer manages class", function () {
  context("Lecturer creates a new class", function () {
    before(() => {
      cy.fixture("lecturer/success-create-class-response").then((res) => {
        interceptCreateClass(res);
      });

      cy.fixture("get-class-reviews-response1").then((reviewsData) => {
        this.reviewsData = reviewsData;
        cy.fixture("lecturer/get-class-response").then((classData) => {
          this.classData = classData;
          interceptRetrieveClassCreated(this.reviewsData, this.classData);
        });
      });
    });

    function interceptCreateClass(resBody) {
      cy.intercept("POST", "/v1/classes/", (req) => {
        req.reply({
          statusCode: 200,
          body: resBody,
        });
      });
    }

    function interceptRetrieveClassCreated(resBodyReviews, resBodyClassInfo) {
      cy.fixture("lecturer/new-class-slug").then((data) => {
        // retrieve class reviews
        cy.intercept("GET", `/v1/review/${data.slug}`, (req) => {
          req.reply({
            statusCode: 200,
            body: resBodyReviews,
          });
        });

        // retrieve class info
        cy.intercept("GET", `/v1/classes/${data.slug}`, (req) => {
          req.reply({
            statusCode: 200,
            body: resBodyClassInfo,
          });
        });
      });
    }
    context("Lecturer has at least one class", function () {
      context("Main flow create class", function () {
        self = this;

        before(() => {
          // load fixtures and intercept
          cy.fixture("student/successful-join-with-code-response3.json").then((response) => {
            this.joinResponse = response;
            cy.fixture("student/get-class-details-response1.json").then((response) => {
              this.classDetailsResponse = response;
              cy.fixture("get-class-reviews-response1.json").then((response) => {
                this.allClassReviewsResponse = response;
                cy.interceptJoinClass(this.joinResponse, this.classDetailsResponse, this.allClassReviewsResponse, self.slug);
              });
            });
          });

          cy.fixture("lecturer/get-class-response.json").then((data) => {
            self.inviteCode = data.data.inviteCode;
            self.slug = data.data.slug;
          });
        });

        it("should let lecturer create class with valid class ID and class name", function () {
          cy.visit(`${Cypress.config("lecturerClientBaseUrl")}/${Cypress.env("login_url")}`);

          cy.fixture("lecturer/lecturer-account.json").then((data) => {
            cy.login(data.username, data.password);
          });
          homepage.click3Dots();
          homepage.clickCreateAClassDiv();
          createClassModal.checkContainerVisible();
          cy.fixture("lecturer/valid-class-info").then((data) => {
            createClassModal.typeClassID(data.ID).typeClassName(data.name).clickCreateBtn();
            createClassPopUpMessage.checkCreateClassSuccess();
            cy.url().should("include", "classes/feeds");

            // student
            classFeed.clickCopyBtn();

            cy.window().then((win) => {
              win.navigator.clipboard.readText().then((text) => {
                expect(text).to.eq(self.inviteCode);
              });
            });
          });
        });

        it("should verify that student can join newly created class with invite code", function () {
          cy.visit(`${Cypress.config("studentClientBaseUrl")}/${Cypress.env("login_url")}`);

          cy.fixture("student/student-no-classes.json").then((data) => {
            cy.login(data.username, data.password);
          });

          cy.joinClass("homepage", self.inviteCode, self.slug);
        });
      });
    });

    context("Lecturer has no class", function () {
      beforeEach(() => {
        cy.visit(`${Cypress.config("lecturerClientBaseUrl")}/${Cypress.env("login_url")}`);

        cy.fixture("lecturer/lecturer-account-no-class").then((data) => {
          cy.login(data.username, data.password);
        });
      });

      it("should let lecturer create class with valid class ID and class name", function () {
        homepage.clickGetStartedBtn().clickCreateAClassDiv();

        createClassModal.checkContainerVisible();
        cy.fixture("lecturer/valid-class-info").then((data) => {
          createClassModal.typeClassID(data.ID).typeClassName(data.name).clickCreateBtn();
          createClassPopUpMessage.checkCreateClassSuccess();
          cy.url().should("include", "classes/feeds");

          sidebar.clickClassesLink();
          classes.checkNoClassesTextNotExist();
        });
      });
    });
  });

  context("Lecturer creates a new class no interception", function () {
    beforeEach(() => {
      cy.visit(`${Cypress.config("lecturerClientBaseUrl")}/${Cypress.env("login_url")}`);

      cy.fixture("lecturer/lecturer-account.json").then((data) => {
        cy.login(data.username, data.password);
      });
    });

    it("should cancel creating class", function () {
      homepage.click3Dots();
      homepage.clickCreateAClassDiv();
      createClassModal.checkContainerVisible();
      createClassModal.clickCancelBtn();
      createClassModal.checkContainerNotExist();
    });
    it("should show error if creating class with duplicate class ID ", function () {
      homepage.click3Dots();
      homepage.clickCreateAClassDiv();
      cy.fixture("lecturer/valid-class-info").then((data) => {
        this.name = data.name;
        cy.fixture("lecturer/duplicate-class-ID").then((data) => {
          createClassModal.typeClassID(data.ID).typeClassName(this.name).clickCreateBtn();
          createClassModal.checkErrorMessageVisible();
        });
      });
    });

    it("should show error if creating class with empty class ID", function () {
      homepage.click3Dots();
      homepage.clickCreateAClassDiv();
      cy.fixture("lecturer/valid-class-info").then((data) => {
        createClassModal.typeClassName(data.name).clickCreateBtn();
        createClassModal.checkErrorMessageVisible();
      });
    });

    it("should show error if creating class with empty class name", function () {
      homepage.click3Dots();
      homepage.clickCreateAClassDiv();
      cy.fixture("lecturer/valid-class-info").then((data) => {
        createClassModal.typeClassID(data.ID).clickCreateBtn();
        createClassModal.checkErrorMessageVisible();
      });
    });
  });

  context("Lecturer deletes a class", function () {});
});
