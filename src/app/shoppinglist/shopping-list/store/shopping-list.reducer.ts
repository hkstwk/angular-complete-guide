import { Ingredient } from "src/app/model/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient("Apple", 10),
    new Ingredient("Tomatoes", 20),
    new Ingredient("Onion", 3),
    new Ingredient("Banana", 7),
  ],
};

export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...(<Ingredient[]>action.payload)],
      };
    default:
      return state;
  }
}
