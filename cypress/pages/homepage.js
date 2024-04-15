class HomePage {
  elementsNoClasses = {
    btn_getStarted: () => cy.get("button").contains("Get Started"),
    div_joinAClass: () => cy.get("div").contains("Join a class"),
  };

  elements = {
    popUpJoinClassSuccess: () => cy.contains("div", "Joined class successfully"),
  };

  clickGetStartedBtn() {
    this.elementsNoClasses.btn_getStarted().click();
    return this;
  }

  clickJoinAClassDiv() {
    this.elementsNoClasses.div_joinAClass().click();
    return this;
  }
}

export default new HomePage();
