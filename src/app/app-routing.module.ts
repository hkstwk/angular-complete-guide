import {NgModule} from "@angular/core";
import {RouterModule, Routes, PreloadAllModules} from "@angular/router";

const appRoutes : Routes = [
  { path: '', redirectTo: '/recipes', pathMatch : 'full'},
  { path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule' },
  { path: 'shopping-list', loadChildren: './shoppinglist/shopping-list.module#ShoppingListModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
