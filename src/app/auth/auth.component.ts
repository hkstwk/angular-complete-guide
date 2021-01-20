import {Component, OnInit, OnDestroy} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Subscription, Observable} from "rxjs";
import {AuthService, AuthResponseData} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  userSubscription: Subscription;


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      (usr) => {
        console.log('Signin/Signup successful!! ' + usr.email);
      }
    )
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onCloseError() {
    this.error = null;
  }

  onSubmit(form: NgForm) {
    const credentials = form.value;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    this.error = null;

    if (this.isLoginMode) {
      authObservable = this.authService.signin(credentials.email, credentials.password);
    }
    else {
      authObservable = this.authService.signup(credentials.email, credentials.password);
    }

    authObservable.subscribe(
      (userPayload: AuthResponseData) => {
        console.log(userPayload);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    )

    form.reset();
  }

}
