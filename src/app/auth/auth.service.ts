import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { env } from "../../../.env";
import { User } from "./user.model";
import { AuthResponse } from "./auth-response.model";

@Injectable({providedIn: "root"})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router){}

  sendAuthReq( // handle both signin & signup.
    isLoginMode: boolean,
    email: string, 
    password: string
  ): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(
      isLoginMode ?  env.signInUrl :env.signUpUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),tap(resData => {
        this.handleAuth(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
      }
      )
    )
  }

  autoLogin(){
    const storageData: {
      email: string, 
      id: string, 
      _token: string, 
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!storageData){
      return;
    }
    const storedUser = new User(
      storageData.email, 
      storageData.id, 
      storageData._token,
      new Date(storageData._tokenExpirationDate));
    if(!storedUser.token){
      return;
    }
    const expirationDuration = 
    new Date(storageData._tokenExpirationDate).getTime() - new Date().getTime(); 
    this.user.next(storedUser);
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration){
    this.tokenExpirationTimer = setTimeout( () =>{
      this.logout();
    }, expirationDuration)
  }

  private handleAuth(email: string, id: string, token: string, expiresIn:number){
    const expirationDate = new Date(
      new Date().getTime() + +expiresIn * 1000
    );
    const user = new User(email, id, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
    return this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = "An Error Occurred!"
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "email NOT found";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Wrong password";
        break;
    }
    return throwError(errorMessage);
  }
  // signUp(email: string, password: string): Observable<AuthResponse>{
  //   return this.http.post<AuthResponse>(
  //     env.signUpUrl,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }).pipe(catchError(this.handleError),tap(resData => {
  //       this.handleAuth(
  //         resData.email,
  //         resData.localId,
  //         resData.idToken,
  //         +resData.expiresIn
  //       )
  //     })
  //   )
  // }
  // signIn(email: string, password: string): Observable<AuthResponse>{
  //   return this.http.post<AuthResponse>(
  //     env.signInUrl,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }).pipe(catchError(this.handleError),tap(resData => {
  //       this.handleAuth(
  //         resData.email,
  //         resData.localId,
  //         resData.idToken,
  //         +resData.expiresIn
  //       )
  //     }))
  // }
}
