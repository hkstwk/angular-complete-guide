import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Injectable({ providedIn: "root" })
export class AuthService {
  tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  public setAutoLogoutTimer(expirationDuration: number): void {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logoutNewSyntax());
    }, expirationDuration);
  }

  public clearAutoLogOutTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
