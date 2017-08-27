import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {SettingsRoutingModule} from './settings-routing.module';

import {CustomerInfoComponent} from './component/customer-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule
  ],
  declarations: [
    CustomerInfoComponent
  ],
  exports: [
    CustomerInfoComponent
  ],
  providers: [

  ]
})
export class SettingsModule {}
