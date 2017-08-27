import { AuthGuard } from '../_guards/auth.guard';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {RegistrationsCreateComponent} from './component/registrations-create.component';
import {RegistrationsListComponent} from './component/registrations-list.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'list',
      component: RegistrationsListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'create',
      component: RegistrationsCreateComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: 'list'
    }
  ])],
  exports: [RouterModule]
})
export class RegistrationsRoutingModule {}
