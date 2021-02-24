import { createAction, props } from "@ngrx/store";

export const autoLoginNewSyntax = createAction("[Auth] Auto Login New Syntax");

export const authenticatePassedNewSyntax = createAction(
  "[Auth] Authenticated Passed New Syntax",
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const logoutNewSyntax = createAction("[Auth] Logut New Syntax");

export const signupStartNewSyntax = createAction(
  "[Auth] Signup Start New Syntax",
  props<{
    email: string;
    password: string;
  }>()
);

export const loginStartNewSyntax = createAction(
  "[Auth] Login Start New Syntax",
  props<{
    email: string;
    password: string;
  }>()
);

export const clearErrorNewSyntax = createAction(
  "[Auth] Clear Error New Syntax"
);

export const authenticationFailedNewSyntax = createAction(
  "[Auth] Authentication Failed New Syntax",
  props<{
    errorMessage: string;
  }>()
);
