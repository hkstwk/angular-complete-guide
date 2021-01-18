export class User {

  constructor(public email: string,
              public id: string,
              private _token: string,
              private _tokenExpirationDate) {
  }


  get token(): string {
    if (!this._tokenExpirationData || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get tokenExpirationData() {
    return this._tokenExpirationDate;
  }
}
