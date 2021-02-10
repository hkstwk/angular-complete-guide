import { Recipe } from "../model/recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../model/ingredient.model";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../shoppinglist/shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class RecipeService {
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor(private store: Store<fromApp.AppState>) {}

  // private recipes: Recipe[] = [
  //   new Recipe('Chicken curry',
  //     'This the first description',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/b2/Food-O-Holic.jpg',
  //     [
  //       new Ingredient('Rice', 250),
  //       new Ingredient('Chicken', 2)
  //     ]),
  //   new Recipe('Oat meal',
  //     'This the second description',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/b2/Food-O-Holic.jpg',
  //     [
  //       new Ingredient('oat', 250),
  //       new Ingredient('milk', 2000)
  //     ]),
  //   new Recipe('yoghurt',
  //     'This the third description',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/b2/Food-O-Holic.jpg',
  //     [
  //       new Ingredient('yoghurt', 250),
  //       new Ingredient('sugar', 10),
  //       new Ingredient('sereal', 25)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  public deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  public setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
