class JoinClassModal {
  elements = {
    inviteCodeInput: cy.get("input#code"),
    joinBtn: cy.get("button").contains("Join"),
  };

  typeInviteCode(inviteCode) {
    this.elements.inviteCodeInput.type(inviteCode);
  }

  clickJoinBtn() {
    this.elements.joinBtn.click();
  }
}

export default new JoinClassModal();
