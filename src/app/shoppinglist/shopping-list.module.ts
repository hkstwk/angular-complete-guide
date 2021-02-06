import { NgModule } from "@angular/core";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: ShoppingListComponent }]),
  ],
  exports: [],
})
export class ShoppingListModule {}
