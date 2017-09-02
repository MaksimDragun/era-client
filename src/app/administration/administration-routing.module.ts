import {AuthGuard} from '../core/auth/auth.guard';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {UserAccountsComponent} from './component/user-accounts.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'user-accounts',
      component: UserAccountsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: 'user-accounts'
    }
  ])],
  exports: [RouterModule]
})
export class RegistrationsRoutingModule {}
