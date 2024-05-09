class CreateClassModal {
  elements = {
    input_classID: () => cy.get("input#cid"),
    input_className: () => cy.get("input#name"),
    btn_createClass: () => cy.get("button").contains("Create"),
    btn_cancel: () => cy.get("button").contains("Cancel"),
    container: () => cy.contains("div.ant-modal-content", "Create new class"),
    errorMessage: () => cy.get("div.ant-form-item-explain-error"),
  };

  typeClassID(classID) {
    this.elements.input_classID().type(classID);
    return this;
  }

  typeClassName(className) {
    this.elements.input_className().type(className);
    return this;
  }

  clickCreateBtn() {
    this.elements.btn_createClass().click();
    return this;
  }

  clickCancelBtn() {
    this.elements.btn_cancel().click();
    return this;
  }

  checkContainerVisible() {
    this.elements.container().should("exist");
    return this;
  }
  checkContainerNotExist() {
    this.elements.container().should("not.exist");
    return this;
  }

  checkErrorMessageVisible() {
    this.elements.errorMessage().should("be.visible");
    return this;
  }
}

export default new CreateClassModal();
