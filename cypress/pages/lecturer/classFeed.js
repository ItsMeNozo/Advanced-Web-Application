class ClassFeed {
  elements = {
    btn_copy: () => cy.get("div[aria-label='Copy']"),
    btn_delete: () => cy.get("button").contains("Delete"),
    toast_deleteSuccess: () => cy.contains("div", "Delete class successfully"),
    dialog_confirmDelete: () => cy.get("div.ant-modal-content"),
    div_yesConfirmDelete: () => cy.contains("div", "Yes"),
  };

  clickCopyBtn() {
    this.elements.btn_copy().click();
    return this;
  }

  clickDeleteBtn() {
    this.elements.btn_delete().should("be.visible");
    this.elements.btn_delete().click();
    return this;
  }

  checkConfirmDeleteDialogVisible() {
    this.elements.dialog_confirmDelete().should("be.visible");
    return this;
  }

  checkDeleteSuccessToastVisible() {
    this.elements.toast_deleteSuccess.should("be.visible");
    return this;
  }

  clickYesConfirmDelete() {
    this.elements.div_yesConfirmDelete().click();
    return this;
  }
}

export default new ClassFeed();
