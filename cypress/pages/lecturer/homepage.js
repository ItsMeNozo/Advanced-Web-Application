class HomePage {
  elementsNoClasses = {
    btn_getStarted: () => cy.get("button").contains("Get Started"),
  };

  elements = {
    popUpCreateClassSuccess: () => cy.contains("div", "Created class successfully"),
    btn_3dots: () => cy.get("button svg.svg-inline--fa.fa-ellipsis.fa-lg"),
    div_createAClass: () => cy.get("div").contains("Create a class"),
  };

  clickGetStartedBtn() {
    this.elementsNoClasses.btn_getStarted().click();
    return this;
  }

  clickCreateAClassDiv() {
    this.elements.div_createAClass().click();
    return this;
  }

  click3Dots() {
    this.elements.btn_3dots().click();
    return this;
  }
}

export default new HomePage();
