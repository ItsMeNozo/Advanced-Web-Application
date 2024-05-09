class ProfilePage {
    elements = {
        input_lastName: () => cy.get("input#user-profile_lastname"),
        input_firstName: () => cy.get("input#user-profile_firstname"),
        input_email: () => cy.get("input#user-profile_email"),
        input_phoneNumber: () => cy.get("input#user-profile_phoneNumber"),
        btn_update: () =>
            cy.get('button[type="submit"]').filter(":contains('Update')"),
        btn_cancel: () =>
            cy.get('button[type="button"]').filter(":contains('Cancel')"),
        input_upload_avatar: () => cy.get('#user-profile input[type="file"]'),
        btn_avatar_ok: () =>
            cy
                .get('.ant-modal-footer button[type="button"]')
                .filter(":contains('OK')"),
        btn_avatar_cancel: () =>
            cy
                .get('.ant-modal-footer button[type="button"]')
                .filter(":contains('Cancel')"),
    };

    editLastName(lastName) {
        this.elements.input_lastName().clear().type(lastName);
        return this;
    }

    clearLastName() {
        this.elements.input_lastName().clear();
        return this;
    }

    editFirstName(firstName) {
        this.elements.input_firstName().clear().type(firstName);
        return this;
    }

    clearFirstName() {
        this.elements.input_firstName().clear();
        return this;
    }

    editEmail(email) {
        this.elements.input_email().clear().type(email);
        return this;
    }

    clearEmail() {
        this.elements.input_email().clear();
        return this;
    }

    editPhoneNumber(phoneNumber) {
        this.elements.input_phoneNumber().clear().type(phoneNumber);
        return this;
    }

    clearPhoneNumber() {
        this.elements.input_phoneNumber().clear();
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

    uploadAvatar(fileName) {
        this.elements
            .input_upload_avatar()
            .selectFile(fileName, { force: true });
    }

    clickAvatarOKBtn() {
        this.elements.btn_avatar_ok().click();
        return this;
    }

    clickAvatarCancelBtn() {
        this.elements.btn_avatar_cancel().click();
        return this;
    }
}

export default new ProfilePage();
