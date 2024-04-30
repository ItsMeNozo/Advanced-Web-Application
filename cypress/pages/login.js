class Login {
  elements = {
    input_email: () => cy.get("input#basic_username"),
    input_password: () => cy.get("input#basic_password"),
    btn_signIn: () => cy.get('button[type="submit"]').filter(":contains('Log in to your account')"),
  };
}

export default new Login();
