class CreateClassPopUpMessage {
  elements = {
    popUp_createClassSuccess: () => cy.contains("div", "Class created successfully"),
  };

  checkCreateClassSuccess() {
    this.elements.popUp_createClassSuccess().should("be.visible");
    return this;
  }
}

export default new CreateClassPopUpMessage();
