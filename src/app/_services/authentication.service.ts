import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {UserDetails} from '../_models/user-details';

@Injectable()
export class AuthenticationService {

  private loginUrl = 'api/login';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  login(username: string, password: string) {
    return this.http.post(this.loginUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
      .toPromise()
      .then(response => {
        // login successful if there's a jwt token in the response
        const user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
