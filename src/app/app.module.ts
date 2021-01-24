import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RecipeModule} from "./recipes/recipe.module";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "./app.component";
import {WarningAlertComponent} from "./warningalert/warningalert.component";
import {SuccessAlertComponent} from "./successalert/successalert.component";
import {HeaderComponent} from "./header/header.component";
import {AuthComponent} from "./auth/auth.component";
import {ShoppingListModule} from "./shoppinglist/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipeModule,
    ShoppingListModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
