import {AuthGuard} from '../core/auth/auth.guard';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CustomerInfoComponent} from './component/customer-info.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'customer-info',
      component: CustomerInfoComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: 'customer-info'
    }
  ])],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
