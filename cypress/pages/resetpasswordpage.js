class ResetPasswordPage {
    elements = {
        input_currentPassword: () =>
            cy.get("input#reset-password_currentPassword"),
        input_newPassword: () => cy.get("input#reset-password_newPassword"),
        input_confirmPassword: () =>
            cy.get("input#reset-password_confirmPassword"),
        btn_update: () =>
            cy.get('button[type="submit"]').filter(":contains('Update')"),
        btn_cancel: () =>
            cy.get('button[type="button"]').filter(":contains('Cancel')"),
    };

    editCurrentPassword(currentPassword) {
        this.elements.input_currentPassword().clear().type(currentPassword);
        return this;
    }

    clearCurrentPassword() {
        this.elements.input_currentPassword().clear();
        return this;
    }

    editNewPassword(newPassword) {
        this.elements.input_newPassword().clear().type(newPassword);
        return this;
    }

    clearNewPassword() {
        this.elements.input_newPassword().clear();
        return this;
    }

    editConfirmPassword(confirmPassword) {
        this.elements.input_confirmPassword().clear().type(confirmPassword);
        return this;
    }

    clearConfirmPassword() {
        this.elements.input_confirmPassword().clear();
        return this;
    }

    clickUpdateBtn() {
        this.elements.btn_update().click();
        return this;
    }

    clickCancelBtn() {
        this.elements.btn_cancel().click();
        return this;
    }
}

export default new ResetPasswordPage();
