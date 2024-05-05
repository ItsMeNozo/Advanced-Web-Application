class ClassFeed {
  studentIDPopUp = {
    container: () => cy.get("div.ant-modal-content"),
    textInput: () => cy.get("input#studentID"),
    btn_later: () => cy.contains("button", "Later"),
    btn_update: () => cy.contains("button", "Update"),
  };
}

export default new ClassFeed();
