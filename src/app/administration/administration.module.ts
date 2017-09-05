import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {NKDatetimeModule} from 'ng2-datetime/ng2-datetime';

import {TranslateModule} from '@ngx-translate/core';

import {AdministrationRoutingModule} from './administration-routing.module';
import {RolesViewDialogComponent} from './component/roles-view-dialog.component';
import {UserAccountCreateComponent} from './component/user-account-create.component';

import {UserAccountsComponent} from './component/user-accounts.component';

declare const $: any;
declare const JQuery: any;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NKDatetimeModule,
    AdministrationRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    UserAccountsComponent,
    RolesViewDialogComponent,
    UserAccountCreateComponent
  ],
  exports: [
  ],
  providers: [

  ]
})
export class AdministrationModule {}
