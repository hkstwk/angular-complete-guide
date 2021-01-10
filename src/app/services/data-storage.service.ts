import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {RecipeService} from "./recipe.service";
import {Recipe} from "../model/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    this.http.put<Recipe[]>(
      'https://angular-course-udemy-rec-62fc9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      this.recipeService.getRecipes()
    ).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://angular-course-udemy-rec-62fc9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
         })
      );
  }

}
