import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router'
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    if(this.authService.loggedIn()) {
      console.log('true')
      return true;
    } else {
      console.log('false')
      this.router.navigate(['/login']);
      return false;
    }
  }
  canDeactivate() {
    if(this.authService.logout()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
