import {AuthGuard} from '../core/auth/auth.guard';
import {RegistrationDetailsComponent} from './component/details/registration-details.component';
import {RegistrationsCreateComponent} from './component/edit/registration-create.component';
import {RegistrationUpdateComponent} from './component/edit/registration-update.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {RegistrationPeriodListComponent} from './component/registration-period-list.component';
import {RegistrationsListComponent} from './component/registrations-list.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'list',
      component: RegistrationsListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'details/:id',
      component: RegistrationDetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'update/:id',
      component: RegistrationUpdateComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'create',
      component: RegistrationsCreateComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'periods',
      component: RegistrationPeriodListComponent,
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
