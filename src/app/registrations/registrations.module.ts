import {SharedModule} from '../shared/shared.module';
import {BenefitsTabComponent} from './component/details/benefits-tab.component';
import {CertificateInfoTabComponent} from './component/details/certificate-info-tab.component';
import {ExamResultsTabComponent} from './component/details/exam-results-tab.component';
import {PersonInfoTabComponent} from './component/details/person-info-tab.component';
import {RegistrationDetailsComponent} from './component/details/registration-details.component';
import {RegistrationInfoPanelComponent} from './component/details/registration-info-panel.component';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {RegistrationsRoutingModule} from './registrations-routing.module';
import {EditCertificateModalComponent} from './component/edit-certificate-modal.component';
import {EditExamSubjectsModalComponent} from './component/edit-exam-subjects-modal.component';
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
    BenefitsTabComponent,
    CertificateInfoTabComponent,
    EditCertificateModalComponent,
    EditExamSubjectsModalComponent,
    EditPayerModalComponent,
    ExamResultsTabComponent,
    PersonInfoTabComponent,
    RegistrationDetailsComponent,
    RegistrationInfoPanelComponent,
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
