import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {Api} from './http/api.service';
import {AuthGuard} from './auth/auth.guard';
import {AuthenticationService} from './auth/authentication.service';
import {MenuService} from './menu/menu.service';
import {MessagesService} from './messages/messages.service';
import {TitleService} from './services/title.service';



@NgModule({
  imports: [
    HttpModule
  ],
  exports: [],
  providers: [
    Api,
    AuthenticationService,
    AuthGuard,
    MenuService,
    MessagesService,
    TitleService
  ]
})
export class CoreModule {}
