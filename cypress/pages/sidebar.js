class Sidebar {
  elements = {
    lnk_homeScreen: () => cy.contains("a", "Home screen"),
    lnk_classes: () => cy.contains("a", "Classes"),
    lnk_calendar: () => cy.contains("a", "Calendar"),
    lnk_settings: () => cy.contains("a", "Settings"),
  };

  clickHomeScreenLink() {
    this.elements.lnk_homeScreen().click();
  }

  clickClassesLink() {
    this.elements.lnk_classes().click();
  }

  clickCalendarLink() {
    this.elements.lnk_calendar().click();
  }

  clickSettingsLink() {
    this.elements.lnk_settings().click();
  }
}

export default new Sidebar();
