import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {UserDetails} from '../../_models/user-details';
import {Api} from '../http/api.service';
import {resolve} from 'url';

@Injectable()
export class AuthenticationService {

  private userDetails: UserDetails;

  private loginUrl = 'api/login';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private api: Api) {}

  login(username: string, password: string): any {
    return this.api.post(this.loginUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
      .then((user: any) => {
        if (user && user.token) {
          if (user.token) {
            localStorage.setItem('currentUserToken', user.token);
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          if (user.userDetails) {
            this.userDetails = user.userDetails;
            console.log(this.userDetails);
          }
        }
      });
  }

  logout(): void {
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('currentUser');
    this.userDetails = undefined;
  }

  getUserDetails(): Promise<UserDetails> {
    return new Promise<UserDetails>((resolve, reject) => {
      if (this.userDetails) {
        resolve(this.userDetails);
      } else {
        const userDetails = JSON.parse(localStorage.getItem('currentUser')).userDetails;
        if (userDetails) {
          this.userDetails = userDetails;
          resolve(this.userDetails);
        } else {
          setTimeout(1000, () => {
            resolve(this.userDetails);
          });
        }
      }
    });
  }

  hasPermissions(userRoles: {authority: string}[], rolesToCheck: string[]): boolean {
    for (const roleToCheck of rolesToCheck) {
      let hasRole = false;
      for (const userRole of userRoles) {
        if (userRole.authority === roleToCheck) {
          hasRole = true;
          break;
        }
      }
      if (!hasRole) {
        return false;
      }
    }
    return true;
  }
}
