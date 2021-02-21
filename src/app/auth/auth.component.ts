import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  storeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select("auth")
      .subscribe((authState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if (authState.user) {
          console.log("Signin/Signup successful!! " + authState.user.email);
        }
      });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onCloseError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  onSubmit(form: NgForm) {
    const credentials: { email: string; password: string } = form.value;

    if (this.isLoginMode) {
      this.store.dispatch(
        AuthActions.loginStartNewSyntax({
          email: credentials.email,
          password: credentials.password,
        })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({
          email: credentials.email,
          password: credentials.password,
        })
      );
    }
    form.reset();
  }
}
