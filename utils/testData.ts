/**
 * Test Data — centralised credentials & constants
 *
 * Keeps magic strings out of test files and makes
 * maintenance / environment switching easy.
 */

export const validUser = {
  username: "tomsmith",
  password: "SuperSecretPassword!",
};

export const invalidCredentials = {
  wrongUsername: { username: "wronguser", password: "SuperSecretPassword!" },
  wrongPassword: { username: "tomsmith", password: "WrongPassword!" },
  emptyFields: { username: "", password: "" },
};

export const urls = {
  loginPage: "https://the-internet.herokuapp.com/login",
  secureArea: "https://the-internet.herokuapp.com/secure",
};
