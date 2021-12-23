import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: AuthService
  ) {}
  canActivate(): boolean {
    if (this.service.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']).then(r => console.log('redirect to login page'));
      return false;
    }
  }
}
