import profilepage from "../../../pages/profilepage";

describe("Student Update Profile Infomation", () => {
    beforeEach(() => {
        switch (Cypress.currentTest.title) {
            case "TC-101-5: Go to the profile screen by link when not logged in yet":
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

    it("TC-101-1: Update profile avatar lower than 2MB png file", () => {
        cy.fixture("student/profile/avatar/PNG_1MB.png", null).as("myAvatar");
        profilepage.uploadAvatar("@myAvatar");

        profilepage.clickAvatarOKBtn();

        cy.wait(2000);

        cy.get(".ant-message-success")
            .should("exist")
            .should("have.text", "Avatar upload successfully");
    });

    it("TC-101-2: Update profile avatar lower than 2MB jpg file", () => {
        cy.fixture("student/profile/avatar/JPG_1MB.jpg", null).as("myAvatar");
        profilepage.uploadAvatar("@myAvatar");

        profilepage.clickAvatarOKBtn();

        cy.wait(2000);

        cy.get(".ant-message-success")
            .should("exist")
            .should("have.text", "Avatar upload successfully");
    });

    it("TC-101-4: Cancel update profile avatar ", () => {
        cy.fixture("student/profile/avatar/JPG_1MB.jpg", null).as("myAvatar");
        profilepage.uploadAvatar("@myAvatar");

        profilepage.clickAvatarCancelBtn();

        cy.get(".ant-message-success").should("not.exist");
    });

    it("TC-101-5: Go to the profile screen by link when not logged in yet", () => {
        cy.url().should("include", Cypress.env("login_url"));
    });

    it("TC-101-6: Update profile avatar with png file greater than 2MB", () => {
        cy.fixture("student/profile/avatar/PNG_3MB.png", null).as("myAvatar");
        profilepage.uploadAvatar("@myAvatar");

        profilepage.clickAvatarOKBtn();

        //cy.wait(2000);

        cy.get(".ant-message-error")
            .should("exist")
            .should("have.text", "Avatar must not be greater than 2MB");
    });

    it("TC-101-7-1: Update profile avatar lower than 2MB file but not png or jpg", () => {
        cy.fixture("student/profile/avatar/GIF_1MB.gif", null).as("myAvatar");
        profilepage.uploadAvatar("@myAvatar");

        profilepage.clickAvatarOKBtn();

        //cy.wait(2000);

        cy.get(".ant-message-error")
            .should("exist")
            .should("have.text", "Invalid file, just accept file jepg and png");
    });

    it("TC-101-7-2: Update profile avatar lower than 2MB file but not png or jpg", () => {
        cy.fixture("student/profile/avatar/SVG_1MB.svg", null).as("myAvatar");
        profilepage.uploadAvatar("@myAvatar");

        profilepage.clickAvatarOKBtn();

        //cy.wait(2000);

        cy.get(".ant-message-error")
            .should("exist")
            .should("have.text", "Invalid file, just accept file jepg and png");
    });

    it("TC-101-7-3: Update profile avatar lower than 2MB file but not png or jpg", () => {
        cy.fixture("student/profile/avatar/PDF_1MB.pdf", null).as("myAvatar");
        profilepage.uploadAvatar("@myAvatar");

        profilepage.clickAvatarOKBtn();

        //cy.wait(2000);

        cy.get(".ant-message-error")
            .should("exist")
            .should("have.text", "Invalid file, just accept file jepg and png");
    });

    it("TC-101-7-4: Update profile avatar lower than 2MB file but not png or jpg", () => {
        cy.fixture("student/profile/avatar/ZIP_1MB.zip", null).as("myAvatar");
        profilepage.uploadAvatar("@myAvatar");

        profilepage.clickAvatarOKBtn();

        //cy.wait(2000);

        cy.get(".ant-message-error")
            .should("exist")
            .should("have.text", "Invalid file, just accept file jepg and png");
    });
});
