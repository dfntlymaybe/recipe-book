import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { AuthResponse } from "./auth-response.model";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit{
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;

  constructor(private authService: AuthService){}
  onSwitchMode():void{
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let resObj: Observable<AuthResponse>;
    this.isLoading = true;

    if(this.isLoginMode){
      resObj = this.authService.signIn(email, password);
    }else{ //sign up mode
      resObj = this.authService.signUp(email, password);
    }
    resObj.subscribe(response => {
        console.log(response);
        this.isLoading = false;
    }, errorMessage => {
        this.errorMessage = errorMessage;
        console.log(errorMessage);
        this.isLoading = false;
    });
    form.reset();
  }
  ngOnInit(){

  }
}
