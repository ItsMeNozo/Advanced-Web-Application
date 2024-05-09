import resetpasswordpage from "../../../pages/resetpasswordpage";

describe("Student Reset Password", () => {
    beforeEach(() => {
        switch (Cypress.currentTest.title) {
            case "TC-99-5: Go to the reset password screen by link when not logged in yet":
                cy.visit(
                    `${Cypress.config("studentClientBaseUrl")}${Cypress.env(
                        "reset_password_url"
                    )}`
                );
                break;
            case "TC-99-2: Verify reset password by log in with new password after reset password successfully":
                break;
            case "TC-99-3: Reset password with required fields and 9 characters of new password, confirm password is the same as new password":
                cy.visit(
                    `${Cypress.config("studentClientBaseUrl")}/${Cypress.env(
                        "login_url"
                    )}`
                );

                cy.fixture("student/profile/password/test-account2.json").then(
                    (data) => {
                        cy.login(data.username, data.password);
                    }
                );

                cy.url().should("include", Cypress.env("home_url"));
                cy.visit(
                    `${Cypress.config("studentClientBaseUrl")}${Cypress.env(
                        "reset_password_url"
                    )}`
                );
                break;
            default:
                cy.visit(
                    `${Cypress.config("studentClientBaseUrl")}/${Cypress.env(
                        "login_url"
                    )}`
                );

                cy.fixture("student/profile/password/test-account1.json").then(
                    (data) => {
                        cy.login(data.username, data.password);
                    }
                );

                cy.url().should("include", Cypress.env("home_url"));
                cy.visit(
                    `${Cypress.config("studentClientBaseUrl")}${Cypress.env(
                        "reset_password_url"
                    )}`
                );
                break;
        }
    });

    it("TC-99-1: Reset password with required fields and 8 characters of new password, confirm password is the same as new password", () => {
        cy.fixture("student/profile/password/valid-reset-password1.json").then(
            (resetpassword) => {
                resetpasswordpage.editCurrentPassword(
                    resetpassword.currentPassword
                );
                resetpasswordpage.editNewPassword(resetpassword.newPassword);
                resetpasswordpage.editConfirmPassword(
                    resetpassword.confirmPassword
                );
            }
        );

        resetpasswordpage.clickUpdateBtn();

        cy.get(".ant-message-success")
            .should("exist")
            .should("have.text", "Password updated successfully");
    });

    it("TC-99-2: Verify reset password by log in with new password after reset password successfully", () => {
        cy.visit(
            `${Cypress.config("studentClientBaseUrl")}/${Cypress.env(
                "login_url"
            )}`
        );

        cy.fixture("student/profile/password/test-account2.json").then(
            (data) => {
                cy.login(data.username, data.password);
            }
        );

        cy.url().should("include", Cypress.env("home_url"));
    });

    it("TC-99-3: Reset password with required fields and 9 characters of new password, confirm password is the same as new password", () => {
        cy.fixture("student/profile/password/valid-reset-password2.json").then(
            (resetpassword) => {
                resetpasswordpage.editCurrentPassword(
                    resetpassword.currentPassword
                );
                resetpasswordpage.editNewPassword(resetpassword.newPassword);
                resetpasswordpage.editConfirmPassword(
                    resetpassword.confirmPassword
                );
            }
        );

        resetpasswordpage.clickUpdateBtn();

        cy.get(".ant-message-success")
            .should("exist")
            .should("have.text", "Password updated successfully");
    });

    it("TC-99-4: Cancel reset password", () => {
        cy.fixture("student/profile/password/valid-reset-password1.json").then(
            (resetpassword) => {
                resetpasswordpage.editCurrentPassword(
                    resetpassword.currentPassword
                );
                resetpasswordpage.editNewPassword(resetpassword.newPassword);
                resetpasswordpage.editConfirmPassword(
                    resetpassword.confirmPassword
                );
            }
        );

        resetpasswordpage.clickCancelBtn();

        resetpasswordpage.elements
            .input_currentPassword()
            .should("have.value", "");
        resetpasswordpage.elements.input_newPassword().should("have.value", "");
        resetpasswordpage.elements
            .input_confirmPassword()
            .should("have.value", "");
    });

    it("TC-99-5: Go to the reset password screen by link when not logged in yet", () => {
        cy.url().should("include", Cypress.env("login_url"));
    });

    it("TC-99-6: Reset password with empty Current password", () => {
        cy.fixture("student/profile/password/valid-reset-password1.json").then(
            (resetpassword) => {
                resetpasswordpage.editNewPassword(resetpassword.newPassword);
                resetpasswordpage.editConfirmPassword(
                    resetpassword.confirmPassword
                );
            }
        );

        resetpasswordpage.clickUpdateBtn();

        cy.get("#reset-password_currentPassword_help")
            .should("exist")
            .should("have.text", "Password must not be empty");
    });

    it("TC-99-7: Reset password with wrong Current password", () => {
        cy.fixture("student/profile/password/valid-reset-password1.json").then(
            (resetpassword) => {
                resetpasswordpage.editNewPassword(resetpassword.newPassword);
                resetpasswordpage.editConfirmPassword(
                    resetpassword.confirmPassword
                );
            }
        );

        cy.fixture("student/profile/password/wrong-current-password.json").then(
            (resetpassword) => {
                resetpasswordpage.editCurrentPassword(
                    resetpassword.currentPassword
                );
            }
        );

        resetpasswordpage.clickUpdateBtn();

        cy.get(".ant-message-error")
            .should("exist")
            .should("have.text", "Password is not correct");
    });

    it("TC-99-8: Reset password with empty New password", () => {
        cy.fixture("student/profile/password/valid-reset-password1.json").then(
            (resetpassword) => {
                resetpasswordpage.editCurrentPassword(
                    resetpassword.currentPassword
                );
                resetpasswordpage.editConfirmPassword(
                    resetpassword.confirmPassword
                );
            }
        );

        resetpasswordpage.clickUpdateBtn();

        cy.get("#reset-password_newPassword_help")
            .should("exist")
            .should("have.text", "Password must not be empty");
    });

    it("TC-99-9: Reset password with 7 characters New password", () => {
        cy.fixture("student/profile/password/valid-reset-password1.json").then(
            (resetpassword) => {
                resetpasswordpage.editCurrentPassword(
                    resetpassword.currentPassword
                );
                resetpasswordpage.editConfirmPassword(
                    resetpassword.confirmPassword
                );
            }
        );

        cy.fixture("student/profile/password/invalid-new-password.json").then(
            (resetpassword) => {
                resetpasswordpage.editNewPassword(resetpassword.newPassword);
            }
        );

        resetpasswordpage.clickUpdateBtn();

        cy.get("#reset-password_newPassword_help")
            .should("exist")
            .should("have.text", "Password must be at least 8 characters");
    });

    it("TC-99-10: Reset password with New password is the same as Current password", () => {
        cy.fixture("student/profile/password/valid-reset-password1.json").then(
            (resetpassword) => {
                resetpasswordpage.editCurrentPassword(
                    resetpassword.currentPassword
                );
                resetpasswordpage.editNewPassword(
                    resetpassword.currentPassword
                );
                resetpasswordpage.editConfirmPassword(
                    resetpassword.currentPassword
                );
            }
        );

        resetpasswordpage.clickUpdateBtn();

        cy.get("#reset-password_newPassword_help")
            .should("exist")
            .should(
                "have.text",
                "The new password must be different from the current password"
            );
    });

    it("TC-99-11: Reset password with empty Confirm password", () => {
        cy.fixture("student/profile/password/valid-reset-password1.json").then(
            (resetpassword) => {
                resetpasswordpage.editCurrentPassword(
                    resetpassword.currentPassword
                );
                resetpasswordpage.editNewPassword(resetpassword.newPassword);
            }
        );

        resetpasswordpage.clickUpdateBtn();

        cy.get("#reset-password_confirmPassword_help")
            .should("exist")
            .should("have.text", "Password must not be empty");
    });

    it("TC-99-12: Reset password with Confirm password is not the same as New password", () => {
        cy.fixture("student/profile/password/valid-reset-password1.json").then(
            (resetpassword) => {
                resetpasswordpage.editNewPassword(resetpassword.newPassword);
                resetpasswordpage.editCurrentPassword(
                    resetpassword.currentPassword
                );
            }
        );

        cy.fixture("student/profile/password/wrong-confirm-password.json").then(
            (resetpassword) => {
                resetpasswordpage.editConfirmPassword(
                    resetpassword.confirmPassword
                );
            }
        );

        resetpasswordpage.clickUpdateBtn();

        cy.get("#reset-password_confirmPassword_help")
            .should("exist")
            .should("have.text", "The password does not match");
    });
});
