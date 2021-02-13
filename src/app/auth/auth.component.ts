import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";
import { map } from "rxjs/operators";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.store
      .select("auth")
      .pipe(map((authState) => authState.user))
      .subscribe((usr) => {
        if (usr) {
          console.log("Signin/Signup successful!! " + usr.email);
        }
      });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onCloseError() {
    this.error = null;
  }

  onSubmit(form: NgForm) {
    const credentials: { email: string; password: string } = form.value;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    this.error = null;

    if (this.isLoginMode) {
      // authObservable = this.authService.signin(
      //   credentials.email,
      //   credentials.password
      // );
      this.store.dispatch(
        new AuthActions.LoginStart({
          email: credentials.email,
          password: credentials.password,
        })
      );
    } else {
      authObservable = this.authService.signup(
        credentials.email,
        credentials.password
      );
    }

    authObservable.subscribe(
      (userPayload: AuthResponseData) => {
        console.log(userPayload);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
