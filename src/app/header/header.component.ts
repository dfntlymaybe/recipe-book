import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles:[
    `a{
        cursor: pointer;
      }`
   ]
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isLoggedIn = false;
  authSub: Subscription;

  constructor(
    private dsService: DataStorageService,
    private authService: AuthService) {

  }
  ngOnInit(){
    this.authSub = this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    })
  }
  onSaveRecipes():void{
    this.dsService.storeRecipes();
  }
  onFetchRecipes(){
    this.dsService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(){
    this.authService.user.unsubscribe();
  }
}
