import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { User } from "src/app/model/user.model";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import * as AuthActions from "./auth.actions";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem("authData", JSON.stringify(user));
  return AuthActions.authenticatePassedNewSyntax({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = "An unknown error occured";
  if (!errorRes.error || !errorRes.error.error) {
    return of(
      AuthActions.authenticationFailedNewSyntax({ errorMessage: errorMessage })
    );
  }
  switch (errorRes.error.error.message) {
    case "EMAIL_EXISTS":
      errorMessage = "Email already exists";
      break;
    case "EMAIL_NOT_FOUND":
      errorMessage = "Invalid email";
      break;
    case "INVALID_PASSWORD":
      errorMessage = "Invalid password";
      break;
    case "USER_DISABLED":
      errorMessage = "User is disabled";
  }
  return of(
    AuthActions.authenticationFailedNewSyntax({ errorMessage: errorMessage })
  );
};

@Injectable()
export class AuthEffects {
  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStartNewSyntax),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
              environment.firebaseAPIKey,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((respData: AuthResponseData) => {
              this.authService.setAutoLogoutTimer(+respData.expiresIn * 1000);
            }),
            map((respData: AuthResponseData) => {
              console.log("loging success!");
              return handleAuthentication(
                +respData.expiresIn,
                respData.email,
                respData.localId,
                respData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStartNewSyntax),
      switchMap((action) => {
        console.log(action);
        return this.http
          .post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
              environment.firebaseAPIKey,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((respData: AuthResponseData) => {
              this.authService.setAutoLogoutTimer(+respData.expiresIn * 1000);
            }),
            map((respData: AuthResponseData) => {
              console.log("login success!");
              return handleAuthentication(
                +respData.expiresIn,
                respData.email,
                respData.localId,
                respData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutNewSyntax),
        tap(() => {
          this.authService.clearAutoLogOutTimer();
          localStorage.removeItem("authData");
          this.router.navigate(["/auth"]);
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLoginNewSyntax),
      map(() => {
        const authData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem("authData"));

        if (!authData) {
          return { type: "DUMMY" };
        }

        const loadedUser = new User(
          authData.email,
          authData.id,
          authData._token,
          new Date(authData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(authData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setAutoLogoutTimer(expirationDuration);
          return AuthActions.authenticatePassedNewSyntax({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(authData._tokenExpirationDate),
            redirect: false,
          });
        }
        return { type: "DUMMY" };
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticatePassedNewSyntax),
        tap((action) => action.redirect && this.router.navigate(["/"]))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
