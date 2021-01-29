import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const appRoutes : Routes = [
  { path: '', redirectTo: '/recipes', pathMatch : 'full'},
  { path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule' },
  { path: 'shopping-list', loadChildren: './shoppinglist/shopping-list.module#ShoppingListModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
