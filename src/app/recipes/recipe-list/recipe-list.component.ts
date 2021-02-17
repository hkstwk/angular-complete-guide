import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../../model/recipe.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.recipesSubscription = this.store
      .select("recipes")
      .pipe(map((recipeState) => recipeState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onNewRecipe() {
    console.log("onNewRecipe called");
    this.router.navigate(["new"], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
