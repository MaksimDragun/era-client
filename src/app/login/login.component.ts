import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from '../_services/authentication.service';

import {UserDetails} from '../_models/user-details';
import {TranslateService} from '@ngx-translate/core';

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
    private router: Router,
    private translate: TranslateService) {
      translate.setDefaultLang('ru');
      translate.use('ru');
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginData = new LoginData();
  }

  login(loginData: LoginData) {
    this.loading = true;
    this.authenticationService
      .login(loginData.username, loginData.password)
      .then((data) => {
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      })
      .catch((error: any) => {
        this.loading = false;
        console.log('Login failed!');
      });
  }
}

