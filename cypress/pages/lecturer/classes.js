class Classes {
  elementsNoClasses = {
    text_no_classes: () => cy.contains("p", "No Classes Available"),
  };
  elements = {
    class_card: (ID, name) =>
      cy
        .get("div")
        .contains(ID)
        .parent("div")
        .within(() => {
          cy.get("div").contains(name);
        }),
  };

  checkNoClassesTextNotExist() {
    this.elementsNoClasses.text_no_classes().should("not.exist");
    return this;
  }

  checkClassGone(ID, name) {
    this.elements.class_card(ID, name).should("not.exist");
    return this;
  }
}

export default new Classes();
