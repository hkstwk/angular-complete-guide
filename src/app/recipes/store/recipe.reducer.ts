import { Action } from "rxjs/internal/scheduler/Action";
import { Recipe } from "src/app/model/recipe.model";
import * as RecipesActions from "./recipe.actions";

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
};

export function recipeReducer(
  state: RecipeState = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    default:
      return state;
  }
}
