import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import {CookieService} from 'angular2-cookie/services/cookies.service';
import 'rxjs/add/operator/toPromise';

import {UserDetails} from '../_models/user-details';

@Injectable()
export class AuthenticationService {

  private authUrl = 'api/auth/login';
  private logoutUrl = 'api/auth/logout';
  private loggedUserUrl = 'api/auth/logged-user';

  constructor(
    private http: Http,
    private cookieService: CookieService) {}

  login(username: string, password: string): Promise<UserDetails> {
    const token: string = btoa(`${username}:${password}`);

    const headers: Headers = new Headers();
    headers.append('Authorization', `Basic ${token}`);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const options = new RequestOptions({headers: headers});

    this.http.get('http://localhost:8087/sras-web/get-registration-contract/1000/template/1000')
      .toPromise()
      .then(response => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = window.URL.createObjectURL(blob);
      });

    return this.http.get(this.authUrl, options)
      .toPromise()
      .then(response => {
        const userDetails: UserDetails = response.json() as UserDetails;
        userDetails.authToken = headers.get('Authorization');
        return userDetails;
      })
      .catch((response: any) => console.log(`Login Failure: data=${response}`));
  }

  logout(): Promise<void> {
    return this.http.get(this.logoutUrl).toPromise()
      .then(response => {
        return;
      })
      .catch((response: any) => console.log(`Login Failure: data=${response}`));
  }

  getLoggedUser(): Promise<UserDetails> {
    return this.http.get(this.loggedUserUrl)
      .toPromise()
      .then(response => {
        return response.json() as UserDetails;
      })
      .catch((response: any) => console.log('Failure: get logged user!'));
  }
}
