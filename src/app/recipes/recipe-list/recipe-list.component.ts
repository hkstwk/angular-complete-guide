import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../../model/recipe.model";
import { RecipeService } from "../../services/recipe.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipesSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    console.log("onNewRecipe called");
    this.router.navigate(["new"], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
