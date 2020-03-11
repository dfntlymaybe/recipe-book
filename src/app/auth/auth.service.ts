import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { env } from "../../../.env";
import { User } from "./user.model";
import { AuthResponse } from "./auth-response.model";

@Injectable({providedIn: "root"})
export class AuthService {
  user = new Subject<User>();
  constructor(private http: HttpClient){}

  sendAuthReq(
    isLoginMode: boolean,
    email: string,
    password: string): Observable<AuthResponse>{
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
        })
      )
    }
  private handleAuth(email: string, id: string, token: string, expiresIn:number){
    const expirationDate = new Date(
      new Date().getTime() + +expiresIn * 1000
    );
    const user = new User(
      email,
      id,
      token,
      expirationDate
    )
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
