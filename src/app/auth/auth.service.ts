import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {throwError, BehaviorSubject} from "rxjs";
import {User} from "../model/user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
  }

  public signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBw9VQbEGStldxrJOLwr2XbT0NMS0cUdgo',
        {
          'email': email,
          'password': password,
          'returnSecureToken': true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthentication(respData);
        })
      );
  }

  public signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBw9VQbEGStldxrJOLwr2XbT0NMS0cUdgo',
        {
          'email': email,
          'password': password,
          'returnSecureToken': true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthentication(respData);
        })
      );
  }

  public logout(){
    this.user.next(null);
  }

  private handleAuthentication(respData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + (+respData.expiresIn * 1000));
    const tmpUser = new User(respData.email, respData.localId, respData.idToken, expirationDate);
    this.user.next(tmpUser);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS' :
        errorMessage = 'Email already exists';
        break;
      case 'EMAIL_NOT_FOUND' :
        errorMessage = 'Invalid email';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User is disabled';
    }
    return throwError(errorMessage);
  }
}
