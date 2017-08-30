import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';

import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {MessagesService} from './messages/messages.service';



@NgModule({
  imports: [
    HttpModule
  ],
  exports: [],
  providers: [
    MessagesService
  ]
})
export class CoreModule {}
