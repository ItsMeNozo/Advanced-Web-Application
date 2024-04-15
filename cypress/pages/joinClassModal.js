class JoinClassModal {
  elements = {
    inviteCodeInput: () => cy.get("input#code"),
    btn_join: () => cy.get("button").contains("Join"),
  };

  typeInviteCode(inviteCode) {
    this.elements.inviteCodeInput().type(inviteCode);
  }

  clickJoinBtn() {
    this.elements.btn_join().click();
  }
}

export default new JoinClassModal();
