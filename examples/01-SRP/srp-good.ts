/* tslint:disable:max-classes-per-file */

// Good SRP

class UserAuth {
  constructor(user) {
    this.user = user;
  }

  public verifyCredentials() {
    // ...
  }
}

class UserSettings {
  constructor(user) {
    this.user = user;
    this.auth = new UserAuth(user);
  }

  public changeSettings(settings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
