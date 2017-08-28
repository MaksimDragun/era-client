import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {RegistrationsRoutingModule} from './registrations-routing.module';

import {RegistrationsCreateComponent} from './component/registrations-create.component';
import {RegistrationsListComponent} from './component/registrations-list.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrationsRoutingModule,
    TranslateModule.forChild()
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
