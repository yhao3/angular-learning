export class AuthService {

  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        // Once 1000 ms have passed, resolve the promise with the value of this.loggedIn.
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 1000);
      }
    );
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
