import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {RegistrationsRoutingModule} from './registrations-routing.module';

import {RegistrationsCreateComponent} from './component/registrations-create.component';
import {RegistrationsListComponent} from './component/registrations-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrationsRoutingModule
  ],
  declarations: [
    RegistrationsCreateComponent,
    RegistrationsListComponent
  ],
  exports: [
    RegistrationsCreateComponent,
    RegistrationsListComponent
  ],
  providers: [

  ]
})
export class RegistrationsModule {}
