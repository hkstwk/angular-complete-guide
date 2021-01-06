import {Component, OnInit} from "@angular/core";
import {Recipe} from "../../model/recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    console.log('onNewRecipe called');
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });

  }

}
