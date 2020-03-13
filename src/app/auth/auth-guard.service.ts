import { Injectable } from '@angular/core';
import { CanActivate, 
         RouterStateSnapshot,
         ActivatedRouteSnapshot,
         Router,
         UrlTree } from '@angular/router';
import {Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate{
  constructor(private authService: AuthService,
              private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
  boolean | Promise<boolean> | Observable<boolean | UrlTree>{
    return this.authService.user.pipe(
      take(1),
      map(user => {
      if(user){
        return true;
      }else{
        return this.router.createUrlTree(['/auth']);
      }
    }))
  }
}