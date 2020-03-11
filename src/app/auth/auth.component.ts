import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

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

  constructor(
    private authService: AuthService,
    private router: Router){
  }

  onSwitchMode():void{
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.sendAuthReq(this.isLoginMode, email, password)
    .subscribe(response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
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
