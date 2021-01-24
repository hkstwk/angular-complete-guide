import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {WarningAlertComponent} from "./warningalert/warningalert.component";
import {SuccessAlertComponent} from "./successalert/successalert.component";
import {HeaderComponent} from "./header/header.component";
import {ShoppingListComponent} from "./shoppinglist/shopping-list/shopping-list.component";
import {ShoppingListEditComponent} from "./shoppinglist/shopping-list-edit/shopping-list-edit.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeListComponent} from "./recipes/recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipes/recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {DropdownDirective} from "./directives/dropdown.directive";
import {ShoppingListService} from "./services/shopping-list.service";
import {AppRoutingModule} from "./app-routing.module";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeService} from "./services/recipe.service";
import {ReversePipe} from "./recipes/recipe-item/reverse.pipe";
import {HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./auth/auth.component";
import {LoadingSpinnerComponent} from "./common/loading-spinner.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {AlertComponent} from "./common/alert/alert.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    ReversePipe,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
