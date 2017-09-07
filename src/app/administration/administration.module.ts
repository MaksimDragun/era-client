import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {AdministrationRoutingModule} from './administration-routing.module';
import {RolesViewDialogComponent} from './component/roles-view-dialog.component';
import {UserAccountCreateComponent} from './component/user-account-create.component';
import {UserAccountUpdateComponent} from './component/user-account-update.component';
import {UserAccountsComponent} from './component/user-accounts.component';

import {UserAccountService} from './services/user-account.service';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    AdministrationRoutingModule
  ],
  declarations: [
    UserAccountsComponent,
    RolesViewDialogComponent,
    UserAccountCreateComponent,
    UserAccountUpdateComponent
  ],
  exports: [],
  providers: [
    UserAccountService
  ]
})
export class AdministrationModule {}
