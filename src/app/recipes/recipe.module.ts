import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ReversePipe} from "./recipe-item/reverse.pipe";
import {RecipeRoutingModule} from "./recipe-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    ReversePipe,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
  ],
  exports: []

})
export class RecipeModule {

}
