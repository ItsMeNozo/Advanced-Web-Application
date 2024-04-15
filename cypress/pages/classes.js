class Classes {
  elementsNoClasses = {
    btn_plus: () => cy.get("button svg[data-icon = 'plus']"),
  };

  clickPlusBtn() {
    this.elementsNoClasses.btn_plus().click();
  }
}

export default new Classes();
