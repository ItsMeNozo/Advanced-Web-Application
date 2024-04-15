class HomepageNoClasses {
  studentIDPopUp = {
    container: () => cy.get("div.ant-modal-content"),
    textInput: () => cy.get("input#studentID"),
    laterBtn: () => cy.contains("button", "Later"),
    updateBtn: () => cy.contains("button", "Update"),
  };
}

export default new HomepageNoClasses();
