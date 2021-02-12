import { User } from "src/app/model/user.model";
import * as AuthActions from "./auth.actions";

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

export function AuthReducer(
  state = initialState,
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
        user: user,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
