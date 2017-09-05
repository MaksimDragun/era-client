import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {SettingsRoutingModule} from './settings-routing.module';

import {CustomerInfoComponent} from './component/customer-info.component';
import {CustomerService} from './services/customer.service';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    CustomerInfoComponent
  ],
  exports: [
    CustomerInfoComponent
  ],
  providers: [
    CustomerService
  ]
})
export class SettingsModule {}
