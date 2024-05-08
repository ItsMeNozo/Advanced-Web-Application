import profilepage from "../../../pages/profilepage";

describe("Student Update Profile Infomation", () => {
    beforeEach(() => {
        switch (Cypress.currentTest.title) {
            case "TC-98-4: Go to the profile screen by link when not logged in yet":
                cy.visit(
                    `${Cypress.config("studentClientBaseUrl")}${Cypress.env(
                        "profile_url"
                    )}`
                );
                break;
            default:
                cy.visit(
                    `${Cypress.config("studentClientBaseUrl")}/${Cypress.env(
                        "login_url"
                    )}`
                );

                cy.fixture("student/student-with-classes.json").then((data) => {
                    cy.login(data.username, data.password);
                });

                cy.url().should("include", Cypress.env("home_url"));
                cy.visit(
                    `${Cypress.config("studentClientBaseUrl")}${Cypress.env(
                        "profile_url"
                    )}`
                );
                break;
        }
    });

    it("TC-98-1: Update profile information with all optional and required fields, include valid email and phone number", () => {
        cy.fixture("student/profile/valid-profile1.json").then((profile) => {
            profilepage.editLastName(profile.lastName);
            profilepage.editFirstName(profile.firstName);
            profilepage.editEmail(profile.email);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clickUpdateBtn();

        cy.get(".ant-message-success")
            .should("exist")
            .should("have.text", "Update profile successfully");
    });

    it("TC-98-2: Verify student profile infomation by reloading page after update profile successfully", () => {
        cy.fixture("student/profile/valid-profile1.json").then((profile) => {
            profilepage.elements
                .input_lastName()
                .should("have.value", profile.lastName);
            profilepage.elements
                .input_firstName()
                .should("have.value", profile.firstName);
            profilepage.elements
                .input_email()
                .should("have.value", profile.email);
            profilepage.elements
                .input_phoneNumber()
                .should("have.value", profile.phoneNumber);
        });
    });

    it("TC-98-3: Cancel update profile", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editLastName(profile.lastName);
            profilepage.editFirstName(profile.firstName);
            profilepage.editEmail(profile.email);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clickCancelBtn();

        cy.fixture("student/profile/valid-profile1.json").then((profile) => {
            profilepage.elements
                .input_lastName()
                .should("have.value", profile.lastName);
            profilepage.elements
                .input_firstName()
                .should("have.value", profile.firstName);
            profilepage.elements
                .input_email()
                .should("have.value", profile.email);
            profilepage.elements
                .input_phoneNumber()
                .should("have.value", profile.phoneNumber);
        });
    });

    it("TC-98-4: Go to the profile screen by link when not logged in yet", () => {
        cy.url().should("include", Cypress.env("login_url"));
    });

    it("TC-98-5: Update profile with empty Lastname", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editEmail(profile.email);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clearLastName();

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_lastname_help")
            .should("exist")
            .should("have.text", "Lastname must not be empty");
    });

    it("TC-98-6: Update profile with empty Firstname", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editLastName(profile.lastName);
            profilepage.editEmail(profile.email);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clearFirstName();

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_firstname_help")
            .should("exist")
            .should("have.text", "Firstname must not be empty");
    });

    it("TC-98-7: Update profile with empty Email", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clearEmail();

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_email_help")
            .should("exist")
            .should("have.text", "Email must not be empty");
    });

    it("TC-98-8-1: Update profile with invalid Email", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        cy.fixture("student/profile/invalid-email1.json").then((profile) => {
            profilepage.editEmail(profile.email);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_email_help")
            .should("exist")
            .should("have.text", "Email is invalid");
    });

    it("TC-98-8-2: Update profile with invalid Email", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        cy.fixture("student/profile/invalid-email2.json").then((profile) => {
            profilepage.editEmail(profile.email);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_email_help")
            .should("exist")
            .should("have.text", "Email is invalid");
    });

    it("TC-98-8-3: Update profile with invalid Email", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        cy.fixture("student/profile/invalid-email3.json").then((profile) => {
            profilepage.editEmail(profile.email);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_email_help")
            .should("exist")
            .should("have.text", "Email is invalid");
    });

    it("TC-98-8-4: Update profile with invalid Email", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        cy.fixture("student/profile/invalid-email4.json").then((profile) => {
            profilepage.editEmail(profile.email);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_email_help")
            .should("exist")
            .should("have.text", "Email is invalid");
    });

    it("TC-98-8-5: Update profile with invalid Email", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        cy.fixture("student/profile/invalid-email5.json").then((profile) => {
            profilepage.editEmail(profile.email);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_email_help")
            .should("exist")
            .should("have.text", "Email is invalid");
    });

    it("TC-98-8-6: Update profile with invalid Email", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        cy.fixture("student/profile/invalid-email6.json").then((profile) => {
            profilepage.editEmail(profile.email);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_email_help")
            .should("exist")
            .should("have.text", "Email is invalid");
    });

    it("TC-98-8-7: Update profile with invalid Email", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        cy.fixture("student/profile/invalid-email7.json").then((profile) => {
            profilepage.editEmail(profile.email);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_email_help")
            .should("exist")
            .should("have.text", "Email is invalid");
    });

    it("TC-98-9: Update profile with empty Phone number", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editEmail(profile.email);
        });

        profilepage.clearPhoneNumber();

        profilepage.clickUpdateBtn();

        cy.get(".ant-message-success")
            .should("exist")
            .should("have.text", "Update profile successfully");
    });

    it("TC-98-10-1: Update profile with invalid Phone number (invalid format)", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editEmail(profile.email);
        });

        cy.fixture("student/profile/invalid-phone1.json").then((profile) => {
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_phoneNumber_help")
            .should("exist")
            .should("have.text", "Phone number is invalid");
    });

    it("TC-98-10-2: Update profile with invalid Phone number (invalid format)", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editEmail(profile.email);
        });

        cy.fixture("student/profile/invalid-phone2.json").then((profile) => {
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_phoneNumber_help")
            .should("exist")
            .should("have.text", "Phone number is invalid");
    });

    it("TC-98-10-3: Update profile with invalid Phone number (invalid format)", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editEmail(profile.email);
        });

        cy.fixture("student/profile/invalid-phone3.json").then((profile) => {
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_phoneNumber_help")
            .should("exist")
            .should("have.text", "Phone number is invalid");
    });

    it("TC-98-10-4: Update profile with invalid Phone number (invalid format)", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editEmail(profile.email);
        });

        cy.fixture("student/profile/invalid-phone4.json").then((profile) => {
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_phoneNumber_help")
            .should("exist")
            .should("have.text", "Phone number is invalid");
    });

    it("TC-98-10-5: Update profile with invalid Phone number (invalid format)", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editEmail(profile.email);
        });

        cy.fixture("student/profile/invalid-phone5.json").then((profile) => {
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_phoneNumber_help")
            .should("exist")
            .should("have.text", "Phone number is invalid");
    });

    it("TC-98-11-1: Update profile with invalid Phone number (char, symbol)", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editEmail(profile.email);
        });

        cy.fixture("student/profile/invalid-phone6.json").then((profile) => {
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_phoneNumber_help")
            .should("exist")
            .should("have.text", "Phone number is invalid");
    });

    it("TC-98-11-2: Update profile with invalid Phone number (char, symbol)", () => {
        cy.fixture("student/profile/valid-profile2.json").then((profile) => {
            profilepage.editFirstName(profile.firstName);
            profilepage.editLastName(profile.lastName);
            profilepage.editEmail(profile.email);
        });

        cy.fixture("student/profile/invalid-phone7.json").then((profile) => {
            profilepage.editPhoneNumber(profile.phoneNumber);
        });

        profilepage.clickUpdateBtn();

        cy.get("#user-profile_phoneNumber_help")
            .should("exist")
            .should("have.text", "Phone number is invalid");
    });
});
