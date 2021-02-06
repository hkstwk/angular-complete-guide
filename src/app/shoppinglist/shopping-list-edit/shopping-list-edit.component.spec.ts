import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ShoppingListEditComponent } from "./shopping-list-edit.component";

describe("ShoppingListEditComponent", () => {
  let component: ShoppingListEditComponent;
  let fixture: ComponentFixture<ShoppingListEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ShoppingListEditComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
