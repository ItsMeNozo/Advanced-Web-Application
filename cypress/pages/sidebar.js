class Sidebar {
  elements = {
    lnk_homeScreen: () => cy.contains("a", "Home screen"),
    lnk_classes: () => cy.contains("a", "Classes"),
    lnk_calendar: () => cy.contains("a", "Calendar"),
    lnk_settings: () => cy.contains("a", "Settings"),
  };

  clickHomeScreenLink() {
    this.elements.homeScreenLnk().click();
  }

  clickClassesLink() {
    this.elements.classesLnk().click();
  }

  clickCalendarLink() {
    this.elements.calendarLnk().click();
  }

  clickSettingsLink() {
    this.elements.settingsLnk().click();
  }
}

export default new Sidebar();
