import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {routing} from './app.routing';

import {AuthenticationService} from './_services/';

import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [
    AuthenticationService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
