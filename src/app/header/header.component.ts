import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isLoggedIn = false;

  constructor(
    private dsService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select("auth")
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isLoggedIn = !!user;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  onSaveData() {
    this.dsService.storeRecipes();
  }

  onFetchData() {
    this.dsService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
