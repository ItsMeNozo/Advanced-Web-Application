class JoinClassModal {
  elements = {
    inviteCodeInput: () => cy.get("input#code"),
    btn_join: () => cy.get("button").contains("Join"),
  };

  typeInviteCode(inviteCode) {
    this.elements.inviteCodeInput().type(inviteCode);
    return this;
  }

  clickJoinBtn() {
    this.elements.btn_join().click();
    return this;
  }
}

export default new JoinClassModal();
