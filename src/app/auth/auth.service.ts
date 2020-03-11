import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { env } from "../../../.env";
import { AuthResponse } from "./auth-response.model";

@Injectable({providedIn: "root"})
export class AuthService {

  constructor(private http: HttpClient){}

  signUp(email: string, password: string): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(
      env.signUpUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError))
  }
  signIn(email: string, password: string): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(
      env.signInUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError))
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
}
