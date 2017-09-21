import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CoreModule} from './core/core.module';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import * as $ from 'jquery';

@NgModule({
  imports: [
    CoreModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
