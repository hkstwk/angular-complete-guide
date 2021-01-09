import {Recipe} from "../model/recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../model/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {

  recipesChanged : Subject<Recipes[]> = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {
  }

  private recipes: Recipe[] = [
    new Recipe('Chicken curry',
      'This the first description',
      'https://upload.wikimedia.org/wikipedia/commons/b/b2/Food-O-Holic.jpg',
      [
        new Ingredient('Rice', 250),
        new Ingredient('Chicken', 2)
      ]),
    new Recipe('Oat meal',
      'This the second description',
      'https://upload.wikimedia.org/wikipedia/commons/b/b2/Food-O-Holic.jpg',
      [
        new Ingredient('oat', 250),
        new Ingredient('milk', 2000)
      ]),
    new Recipe('yoghurt',
      'This the third description',
      'https://upload.wikimedia.org/wikipedia/commons/b/b2/Food-O-Holic.jpg',
      [
        new Ingredient('yoghurt', 250),
        new Ingredient('sugar', 10),
        new Ingredient('sereal', 25)
      ])
  ];

  public getRecipes() {
    return this.recipes.slice();
  }

  public getRecipe (index: number) : Recipe  {
    return this.recipes[index];
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index]= newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
