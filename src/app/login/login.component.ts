import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from '../core/auth/authentication.service';

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

  error = false;
  errorMsg = null;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginData = new LoginData();
  }

  login(loginData: LoginData) {
    this.error = false;
    this.errorMsg = null;
    this.loading = true;
    this.authenticationService
      .login(loginData.username, loginData.password)
      .then((data) => {
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      })
      .catch((response: any) => {
        this.loading = false;
        this.error = true;
        this.errorMsg = response.status === 401 ? 'login.error.401' : 'login.error.general';
      });
  }
}

