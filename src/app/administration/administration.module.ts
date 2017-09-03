import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {AdministrationRoutingModule} from './administration-routing.module';

import {UserAccountsComponent} from './component/user-accounts.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdministrationRoutingModule,
    TranslateModule.forChild()
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
