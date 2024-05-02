class HomePage {
  elementsNoClasses = {
    btn_getStarted: () => cy.get("button").contains("Get Started"),
    div_joinAClass: () => cy.get("div").contains("Join a class"),
  };

  elements = {
    popUpJoinClassSuccess: () => cy.contains("div", "Joined class successfully"),
    btn_3dots: () => cy.get("button svg.svg-inline--fa.fa-ellipsis.fa-lg"),
    ul_joinAClass: () => cy.contains("ul", "Join a class"),
  };

  clickGetStartedBtn() {
    this.elementsNoClasses.btn_getStarted().click();
    return this;
  }

  clickJoinAClassDiv() {
    this.elementsNoClasses.div_joinAClass().click();
    return this;
  }

  click3Dots() {
    this.elements.btn_3dots().click();
    return this;
  }

  clickJoinAClassUl() {
    this.elements.ul_joinAClass().click();
    return this;
  }
}

export default new HomePage();
