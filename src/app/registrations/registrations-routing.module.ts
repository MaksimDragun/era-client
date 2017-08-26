import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {RegistrationsListComponent} from './component/registrations-list.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'list',
      component: RegistrationsListComponent
    },
    {
      path: '**',
      redirectTo: 'list'
    }
  ])],
  exports: [RouterModule]
})
export class RegistrationsRoutingModule {}