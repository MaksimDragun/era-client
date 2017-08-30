import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {MainRoutings} from './main.routing';

import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {MainComponent} from './main.component';

import {AuthenticationService} from './_services/authentication.service';
import {AuthGuard} from './_guards/index';
import {CustomerService} from './_services/customer.service';
import {MenuService} from './_services/menu.service';
import {RegistrationsService} from './_services/registrations.service';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    MainRoutings,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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
    CustomerService,
    MenuService,
    RegistrationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ru');
    translate.use('ru');
  }

}
