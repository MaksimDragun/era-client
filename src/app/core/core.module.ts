import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {Api} from './http/api.service';
import {AuthGuard} from './auth/auth.guard';
import {AuthenticationService} from './auth/authentication.service';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {MainRoutings} from './main/main.routing';
import {MenuService} from './menu/menu.service';
import {MessagesComponent} from './messages/messages.component';
import {MessagesService} from './messages/messages.service';
import {TitleService} from './services/title.service';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MainRoutings,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    LoginComponent,
    MainComponent,
    MessagesComponent
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
export class CoreModule {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ru');
    translate.use('ru');
  }

}
