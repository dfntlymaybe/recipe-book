import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthResponse } from './auth-response.model';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy{

  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver){
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
        this.showErrorAlert(errorMessage);
        console.log(errorMessage);
        this.isLoading = false;
    });
    form.reset();
  }
  onHandleError():void{
    this.errorMessage = null;
  }
  showErrorAlert(message: string):void{
    const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(alertFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      viewContainerRef.clear();
    })
  }
  ngOnInit(){}
  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
