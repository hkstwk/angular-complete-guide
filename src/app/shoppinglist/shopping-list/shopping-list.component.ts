import {Component, OnInit, OnDestroy} from '@angular/core';
import {Ingredient} from "../../model/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  selectedItem : number;
  clearSelection: boolean = false;
  ingredients: Ingredient[];
  private ingredientChangedSubscription: Subscription;
  private selectedItemSubscription: Subscription;
  private clearSelectionSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientChangedSubscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingr: Ingredient[]) => {
          this.ingredients = ingr;
        }
      );

    this.selectedItemSubscription = this.shoppingListService.startedEditing
      .subscribe(
        (index) => {
          this.selectedItem = index;
        }
      );

    this.clearSelectionSubscription = this.shoppingListService.highlightSelection
      .subscribe(
        (clear : boolean) => {
          if (clear){
            console.log('clear selection = true!');
            this.clearSelection = true;
          } else {
            console.log('clear selection = false!');
            this.clearSelection = false;
          }
        }
      );
  }

  onEditItem(index: number){
    this.shoppingListService.highlightSelection.next(false);
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.ingredientChangedSubscription.unsubscribe();
    this.selectedItemSubscription.unsubscribe();
    this.clearSelectionSubscription.unsubscribe();
  }
}
