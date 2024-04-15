class JoinClassPopUpMessage {
  elements = {
    popUpJoinClassSuccess: () => cy.contains("div", "Joined class successfully"),
  };

  checkJoinClassSuccess() {
    this.popUpJoinClassSuccess.should("be.visible");
  }
}

export default new JoinClassPopUpMessage();
