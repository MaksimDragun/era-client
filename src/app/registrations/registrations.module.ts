import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {RegistrationsRoutingModule} from './registrations-routing.module';
import {EditCertificateModalComponent} from './component/edit-certificate-modal.component';
import {EditPayerModalComponent} from './component/edit-payer-modal.component';
import {RegistrationPeriodListComponent} from './component/registration-period-list.component';
import {RegistrationsCreateComponent} from './component/registrations-create.component';
import {RegistrationsListComponent} from './component/registrations-list.component';
import {RegistrationsService} from './services/registrations.service';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    RegistrationsRoutingModule
  ],
  declarations: [
    EditCertificateModalComponent,
    EditPayerModalComponent,
    RegistrationPeriodListComponent,
    RegistrationsCreateComponent,
    RegistrationsListComponent
  ],
  exports: [
  ],
  providers: [
    RegistrationsService
  ]
})
export class RegistrationsModule {}
