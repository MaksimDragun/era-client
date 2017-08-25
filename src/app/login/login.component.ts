import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from '../_services/authentication.service';

import {UserDetails} from '../_models/user-details';

export class LoginData {
  username: string;
  password: string;
}

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginData: LoginData;
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginData = new LoginData();
  }

  login(loginData: LoginData) {
    this.loading = true;
    this.authenticationService
      .login(loginData.username, loginData.password)
      .then(() => {
        this.loading = false;
        console.log('Login success!');
      })
      .catch((error: any) => {
        this.loading = false;
        console.log('Login failed!');
      });
  }
}

