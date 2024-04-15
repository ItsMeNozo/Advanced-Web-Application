class Login {
  elements = {
    emailInput: () => cy.get("input#basic_username"),
    passwordInput: () => cy.get("input#basic_password"),
    signInBtn: () => cy.get('button[type="submit"]').filter(":contains('Log in to your account')"),
  };
}

export default new Login();
