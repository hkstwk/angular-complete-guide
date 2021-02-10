import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../../model/ingredient.model";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  selectedItem: number;
  clearSelection = false;
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private ingredientChangedSubscription: Subscription;
  private selectedItemSubscription: Subscription;
  private clearSelectionSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");
    // this.ingredients = this.shoppingListService.getIngredients();

    // this.ingredientChangedSubscription = this.shoppingListService.ingredientsChanged
    //   .subscribe(
    //     (ingr: Ingredient[]) => {
    //       this.ingredients = ingr;
    //     }
    //   );

    // this.selectedItemSubscription = this.shoppingListService.startedEditing.subscribe(
    //   (index) => {
    //     this.selectedItem = index;
    //   }
    // );

    // this.clearSelectionSubscription = this.shoppingListService.highlightSelection.subscribe(
    //   (clear: boolean) => {
    //     if (clear) {
    //       console.log("clear selection = true!");
    //       this.clearSelection = true;
    //     } else {
    //       console.log("clear selection = false!");
    //       this.clearSelection = false;
    //     }
    //   }
    // );
  }

  onEditItem(index: number): void {
    console.log("Index of item in array = " + index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.shoppingListService.highlightSelection.next(false);
    // this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    // this.ingredientChangedSubscription.unsubscribe();
    // this.selectedItemSubscription.unsubscribe();
    // this.clearSelectionSubscription.unsubscribe();
  }
}
