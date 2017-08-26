import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {RegistrationsComponent} from './component/registrations.component';
import {RegistrationsListComponent} from './component/registrations-list.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: RegistrationsComponent
    },
    {
      path: 'list',
      component: RegistrationsListComponent
    },
  ])],
  exports: [RouterModule]
})
export class RegistrationsRoutingModule {}
