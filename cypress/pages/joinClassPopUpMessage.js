class JoinClassPopUpMessage {
  elements = {
    popUp_joinClassSuccess: () => cy.contains("div", "Joined class successfully"),
  };

  checkJoinClassSuccess() {
    this.elements.popUp_joinClassSuccess().should("be.visible");
  }
}

export default new JoinClassPopUpMessage();
