/* tslint:disable:max-classes-per-file */

// Bad SRP

class UserSettings {
  constructor(user) {
    this.user = user;
  }

  public changeSettings(settings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  public verifyCredentials() {
    // ...
  }
}
