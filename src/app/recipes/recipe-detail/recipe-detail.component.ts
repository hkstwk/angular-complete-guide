import { Component, OnInit } from "@angular/core";
import { Recipe } from "../../model/recipe.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as fromApp from "../../store/app.reducer";
import * as RecipeActions from "../store/recipe.actions";
import * as ShoppingListActions from "../../shoppinglist/shopping-list/store/shopping-list.actions";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params: Params) => {
          return +params["id"];
        }),
        switchMap((id) => {
          this.id = id;
          console.log(this.id);
          return this.store.select("recipes");
        }),
        map((recipeState) => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  onAddIngredientsToShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.activatedRoute });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.activatedRoute });
    // works too, shows more complex routing using array of routing parts including params related this.id
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(["/recipes"]);
  }
}
