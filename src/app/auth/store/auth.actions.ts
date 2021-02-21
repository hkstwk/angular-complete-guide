import { Action } from "@ngrx/store";
import { createAction, props } from "@ngrx/store";

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
      redirect: boolean;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export const loginStartNewSyntax = createAction(
  "[Auth] Login Start New Syntax",
  props<{
    email: string;
    password: string;
  }>()
);

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
  | AuthenticateFailed
  | SignupStart
  | ClearError
  | AutoLogin;
