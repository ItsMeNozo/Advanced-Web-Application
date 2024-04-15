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
  }

  clickJoinAClassDiv() {
    this.elementsNoClasses.div_joinAClass().click();
  }
}

export default new HomePage();
