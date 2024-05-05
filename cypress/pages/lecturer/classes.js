class Classes {
  elementsNoClasses = {
    text_no_classes: () => cy.contains("p", "No Classes Available"),
  };

  checkNoClassesTextNotExist() {
    this.elementsNoClasses.text_no_classes().should("not.exist");
    return this;
  }
}

export default new Classes();
