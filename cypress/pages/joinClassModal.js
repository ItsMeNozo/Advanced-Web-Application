class JoinClassModal {
  elements = {
    inviteCodeInput: () => cy.get("input#code"),
    btn_join: () => cy.get("button").contains("Join"),
    btn_cancel: () => cy.get("button").contains("Cancel"),
    container: () => cy.get("div.ant-modal-content"),
    errorMessageRejoiningClass: () => cy.get("div").contains("Joined class failed!"),
    errorMessageInvalidCode: () => cy.get("div.ant-form-item-explain-error"),
  };

  typeInviteCode(inviteCode) {
    this.elements.inviteCodeInput().type(inviteCode);
    return this;
  }

  clickJoinBtn() {
    this.elements.btn_join().click();
    return this;
  }

  clickCancelBtn() {
    this.elements.btn_cancel().click();
    return this;
  }

  checkContainerInvisible() {
    this.elements.container().should("not.exist");
  }

  checkErrorMessageInvalidCodeVisible() {
    this.elements.errorMessageInvalidCode().should("be.visible");
  }

  checkErrorMessageEmptyCode() {
    this.elements.errorMessageInvalidCode().should("contain.text", "Please input the class code!");
  }

  checkErrorMessageRejoiningClass() {
    this.elements.errorMessageRejoiningClass().should("be.visible");
  }
}

export default new JoinClassModal();
