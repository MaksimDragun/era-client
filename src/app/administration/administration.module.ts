import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {RegistrationsRoutingModule} from './administration-routing.module';

import {UserAccountsComponent} from './component/user-accounts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrationsRoutingModule
  ],
  declarations: [
    UserAccountsComponent
  ],
  exports: [
    UserAccountsComponent
  ],
  providers: [

  ]
})
export class AdministrationModule {}
