import { Injectable } from '@angular/core';
import { CanActivate, 
         RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate{
  constructor(private authService: AuthService){}
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>{
    return this.authService.user.pipe(map(user => {
      return !!user;
    }))
  }
}