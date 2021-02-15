import * as fromShoppingList from "../shoppinglist/shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import * as fromRecipes from "../recipes/store/recipe.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  shoppingList: fromShoppingList.ShoppingListState;
  auth: fromAuth.AuthState;
  recipes: fromRecipes.RecipeState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShoppingListReducer,
  auth: fromAuth.AuthReducer,
  recipes: fromRecipes.recipeReducer,
};
