class HomePage {
  elementsNoClasses = {
    getStartedBtn: () => cy.get("button").contains("Get Started"),
    joinAClassDiv: () => cy.get("div").contains("Join a class"),
  };

  elements = {
    popUpJoinClassSuccess: () => cy.contains("div", "Joined class successfully"),
  };

  clickGetStartedBtn() {
    this.elementsNoClasses.getStartedBtn().click();
  }

  clickJoinAClassDiv() {
    this.elementsNoClasses.joinAClassDiv().click();
  }
}

export default new HomePage();
