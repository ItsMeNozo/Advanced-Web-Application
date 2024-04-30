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
    return this;
  }

  clickCalendarLink() {
    this.elements.lnk_calendar().click();
    return this;
  }

  clickSettingsLink() {
    this.elements.lnk_settings().click();
    return this;
  }
}

export default new Sidebar();
