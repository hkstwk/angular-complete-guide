import { User } from "src/app/model/user.model";
import * as AuthActions from "./auth.actions";

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

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthActions.AuthActions
) {
  console.log(state);
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.LOGIN_FAILED:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}