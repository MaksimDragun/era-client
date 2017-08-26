import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {MainRoutings} from './main.routing';

import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {MainComponent} from './main.component';

import {AuthenticationService} from './_services/authentication.service';
import {AuthGuard} from './_guards/index';
import {MenuService} from './_services/menu.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MainRoutings
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
