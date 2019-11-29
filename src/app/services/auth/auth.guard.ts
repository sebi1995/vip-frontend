import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private apollo: Apollo,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.getCurrentUser()
      .then(res => {
        return true;
      })
      .catch(() => {
        console.log('gettttiing errorors');
        this.router.navigateByUrl('/login');
        return false;
      });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      this.authService.user().subscribe(({ data }) => {
        console.log(data);
        if (data.user == null) {
          reject(false);
        } else {
          this.addDataToStorage(data.user);
          resolve(true);
        }
      });
    });
  }

  addDataToStorage(user) {
    this.cookieService.set('currUser', JSON.stringify(user));
  }
}
