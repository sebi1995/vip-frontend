import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CookieService } from 'ngx-cookie-service';
//  import query and mutation
import { loginUser, logout } from '../graphql/mutation';
import { user } from '../graphql/query';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private apollo: Apollo,
    private cookieService: CookieService
  ) {}

  /*==================== login ====================*/
  login({ email, password }: any) {
    console.log(email, password);
    return this.apollo.mutate({
      mutation: loginUser,
      variables: {
        email,
        password,
      },
      refetchQueries: [{ query: user }],
    });
  }

  /*==================== logout user ====================*/
  logout() {
    return this.apollo.mutate({
      mutation: logout,
    });
  }

  /*==================== current user ====================*/

  user() {
    return this.apollo.watchQuery<any>({
      query: user,
    }).valueChanges;
  }
}
