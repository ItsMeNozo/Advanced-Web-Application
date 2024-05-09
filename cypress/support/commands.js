// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import studentHomepage from "../pages/student/homepage";
import lecturerHomepage from "../pages/lecturer/homepage";
import login from "../pages/login";
import joinClassModal from "../pages/student/joinClassModal";
import joinClassPopUpMessage from "../pages/student/joinClassPopUpMessage";
import createClassModal from "../pages/lecturer/createClassModal";
import createClassPopUpMessage from "../pages/lecturer/createClassPopUpMessage";

/**
 * Creates login
 * @param {string} email - user email
 * @param {string} password - user password
 */
Cypress.Commands.add("login", (email, password) => {
  login.elements.input_email().type(email);
  login.elements.input_password().type(password);
  login.elements.btn_signIn().click();
});

Cypress.Commands.add("interceptJoinClass", (joinResponse, classDetailsResponse, allClassReviewsResponse, classSlug) => {
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
});

Cypress.Commands.add("joinClass", (pageToJoinFrom, inviteCode, classSlug) => {
  if (pageToJoinFrom === "homepage") {
    studentHomepage.clickGetStartedBtn().clickJoinAClassDiv();
  } else if (pageToJoinFrom === "classes") {
    sidebar.clickClassesLink();
    classes.clickPlusBtn();
  }

  joinClassModal.typeInviteCode(inviteCode);

  joinClassModal.clickJoinBtn();

  joinClassPopUpMessage.checkJoinClassSuccess();
  cy.url().should("include", `${Cypress.env("class_feed_url")}/${classSlug}`);
});

Cypress.Commands.add("createClass", (classID, className) => {
  lecturerHomepage.click3Dots();
  lecturerHomepage.clickCreateAClassDiv();
  createClassModal.checkContainerVisible();
  createClassModal.typeClassID(classID).typeClassName(className).clickCreateBtn();
  createClassPopUpMessage.checkCreateClassSuccess();
  cy.url().should("include", `${Cypress.env("class_feed_url")}`);
});
