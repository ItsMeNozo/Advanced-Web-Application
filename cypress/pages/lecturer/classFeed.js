class ClassFeed {
  elements = {
    btn_copy: () => cy.get("div[aria-label='Copy']"),
  };

  clickCopyBtn() {
    this.elements.btn_copy().click();
    return this;
  }
}

export default new ClassFeed();
