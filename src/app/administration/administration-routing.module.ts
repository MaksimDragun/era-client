import {AuthGuard} from '../core/auth/auth.guard';
import {UserAccountCreateComponent} from './component/user-account-create.component';
import {UserAccountUpdateComponent} from './component/user-account-update.component';
import {UserAccountsComponent} from './component/user-accounts.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'user-accounts',
      component: UserAccountsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'user-accounts/create',
      component: UserAccountCreateComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'user-accounts/update/:id',
      component: UserAccountUpdateComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: 'user-accounts'
    }
  ])],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
