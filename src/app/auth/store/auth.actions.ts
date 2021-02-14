import { Action } from "@ngrx/store";

export const LOGIN_START = "[Auth] Login Start";
export const AUTO_LOGIN = "[Auth] Auto Login";
export const AUTHENTICATE_PASSED = "[Auth] Authenticate Passed";
export const AUTHENTICATE_FAILED = "[Auth] Authenticate Failed";
export const SIGNUP_START = "[Auth] Signup Start";
export const LOGOUT = "[Auth] Logout";
export const CLEAR_ERROR = "[Auth] Clear Error";

export class AuthenticatePassed implements Action {
  readonly type = AUTHENTICATE_PASSED;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class AuthenticateFailed implements Action {
  readonly type = AUTHENTICATE_FAILED;

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | AuthenticatePassed
  | Logout
  | LoginStart
  | AuthenticateFailed
  | SignupStart
  | ClearError
  | AutoLogin;
