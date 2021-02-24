import { User } from "src/app/model/user.model";
import * as AuthActions from "./auth.actions";
import { Action, createReducer, on } from "@ngrx/store";

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};

const _authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginStartNewSyntax,
    AuthActions.signupStartNewSyntax,
    (state) => ({
      ...state,
      authError: null,
      loading: true,
    })
  ),
  on(AuthActions.authenticationFailedNewSyntax, (state, action) => ({
    ...state,
    user: null,
    authError: action.errorMessage,
    loading: false,
  })),
  on(AuthActions.logoutNewSyntax, (state) => ({
    ...state,
    user: null,
  })),
  on(AuthActions.clearErrorNewSyntax, (state) => ({
    ...state,
    authError: null,
    loading: false,
  })),
  on(AuthActions.authenticatePassedNewSyntax, (state, action) => ({
    ...state,
    authError: null,
    loading: false,
    user: new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    ),
  }))
);

export function authReducerNewSyntax(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
