import {Ingredient} from "../model/ingredient.model";
import {Subject} from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ShoppingListService {

  ingredientsChanged : Subject<Ingredient[]> = new Subject<Ingredient[]>();
  startedEditing: Subject<number> = new Subject<number>();
  highlightSelection: Subject<any> = new Subject<any>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 10),
    new Ingredient('Tomatoes', 20),
    new Ingredient('Onion', 3)
  ];

  public getIngredients() {
    return this.ingredients.slice();
  }

  public getIngredient(index: number){
    return this.ingredients[index];
  }

  public addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
