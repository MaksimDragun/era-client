import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';

import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {MessagesService} from './messages/messages.service';
import {TitleService} from './services/title.service';



@NgModule({
  imports: [
    HttpModule
  ],
  exports: [],
  providers: [
    MessagesService,
    TitleService
  ]
})
export class CoreModule {}
