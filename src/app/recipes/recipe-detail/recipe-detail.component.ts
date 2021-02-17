import { Component, OnInit } from "@angular/core";
import { Recipe } from "../../model/recipe.model";
import { RecipeService } from "../../services/recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as fromApp from "../../store/app.reducer";
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
    private recipeService: RecipeService,
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
    console.log(this.id);
  }

  onAddIngredientsToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.activatedRoute });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.activatedRoute });
    // works too, shows more complex routing using array of routing parts including params related this.id
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.recipeService.recipesChanged.next(
      this.recipeService.getRecipes().slice()
    );
    this.router.navigate(["/recipes"]);
  }
}
