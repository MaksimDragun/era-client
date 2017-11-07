import {MessageType} from '../../../core/messages/message';
import {MessagesService} from '../../../core/messages/messages.service';
import {CountryService} from '../../../core/services/country.service';
import {TitleService} from '../../../core/services/title.service';
import {RegistrationsService} from '../../services/registrations.service';
import {AbstractRegistrationEditComponent} from './common/abstract-registration-edit.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';

@Component({
  selector: module.id,
  templateUrl: './registration-create.component.html'
})
export class RegistrationsCreateComponent extends AbstractRegistrationEditComponent {

  constructor(
    protected countryService: CountryService,
    protected messagesService: MessagesService,
    protected registrationsService: RegistrationsService,
    protected router: Router,
    protected titleService: TitleService,
    protected translate: TranslateService) {
    super(countryService, messagesService, registrationsService, router, titleService, translate);
  }

  protected getTitles(): {simple: string, withPeriod: string} {
    return {
      simple: 'registrations.crud.title-create',
      withPeriod: 'registrations.crud.title-create-with-period'
    };
  }

  submitRegistration(): void {

  }

  createRegistrationAccount(): void {
    this.loading = true;
    console.log(this.registration.enrolleeAsPayer);
    this.messagesService.reset();
    this.registration.periodId = this.selectedPeriod.id;
    this.registration.educationInstitutionId = this.selectedPeriod.educationInstitution.id;
    this.registration.specialtyId = this.selectedSpecialty && this.selectedSpecialty.id;

    if (this.registration.educationBase !== L11.value) {
      this.registration.examSubjectMarks = null;
    }

    this.registrationsService.createRegistration(this.registration)
      .then(result => {
        this.messagesService.addMessage(
          {
            msgType: MessageType.SUCCESS,
            key: 'registrations.crud.messages.success-created',
            params: {registrationId: result.registrationId},
            expired: false
          });
        this.router.navigate(['/registrations/list']);
        this.loading = false;
      })
      .catch((error: {issues: Issue[], error: any}) => {
        let warnings = 0;
        let errors = 0;
        error.issues.forEach(issue => {
          if (Issue.ERROR === issue.type) {
            errors++;
          }
          if (Issue.WARNING === issue.type) {
            warnings++;
          }
        });
        this.onlyWarnings = errors === 0 && warnings !== 0;
        this.editCertificateModal.reloadSubjects();
        this.loading = false;
      });
  }


}
