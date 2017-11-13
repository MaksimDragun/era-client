import {ExamSubjectCRUD} from '../../../../core/certificates/exam-subject-crud';
import {Issue} from '../../../../core/http/issue';
import {MessageType, Message} from '../../../../core/messages/message';
import {MessagesService} from '../../../../core/messages/messages.service';
import {CountryService} from '../../../../core/services/country.service';
import {TitleService} from '../../../../core/services/title.service';
import {CertificateCRUD} from '../../../models/certificate-crud';
import {L11} from '../../../models/education-base';
import {PersonCRUD} from '../../../models/person-crud';
import {RegisteredSpecialty} from '../../../models/registered-specialty';
import {RegistrationCRUD} from '../../../models/registration-crud';
import {RegistrationPeriod} from '../../../models/registration-period';
import {RegistrationsService} from '../../../services/registrations.service';
import {EditCertificateModalComponent} from './edit-certificate-modal.component';
import { EditRegistrationDetailsComponent } from './edit-registration-details.component';
import {OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

export abstract class AbstractRegistrationEditComponent implements OnInit {

  @ViewChild('editRegistrationDetails')
  protected editRegistrationDetails: EditRegistrationDetailsComponent;

  documentTypeList = ['P'];
  countryList: string[];

  loading = false;

  selectedPeriod: RegistrationPeriod;

  specialtyList: RegisteredSpecialty[];
  selectedSpecialty: RegisteredSpecialty;

  registration: RegistrationCRUD;

  onlyWarnings = false;

  constructor(
    protected countryService: CountryService,
    protected messagesService: MessagesService,
    protected registrationsService: RegistrationsService,
    protected router: Router,
    protected titleService: TitleService,
    protected translate: TranslateService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey(this.getTitle());
    this.fetchRegistration().then(registration => {
      this.registration = registration;
      this.registration.enrollee.document.type = this.registration.enrollee.document.type || this.documentTypeList[0];
      this.fetchCountries();
    });
  }

  protected abstract fetchRegistration(): Promise<RegistrationCRUD>;

  protected abstract getTitle(): string;

  private fetchCountries(): void {
    this.countryService.fetchList()
      .then(list => {
        this.countryList = list;
        this.registration.enrollee.address.country = this.countryList[0];
        this.registration.enrollee.document.citizenship = this.countryList[0];
      });
  }

  protected abstract getSuccessMessage(reg: RegistrationCRUD): Message;

  submitRegistration(): void {
    this.loading = true;
    this.messagesService.reset();
    this.registration.periodId = this.editRegistrationDetails.selectedPeriod.id;
    this.registration.educationInstitutionId = this.editRegistrationDetails.selectedPeriod.educationInstitution.id;
    this.registration.specialtyId = this.editRegistrationDetails.selectedSpecialty && this.editRegistrationDetails.selectedSpecialty.id;

    if (this.registration.educationBase !== L11.value) {
      this.registration.examSubjectMarks = null;
    }

    this.submit().then(result => {
      this.messagesService.addMessage(this.getSuccessMessage(result));
      this.navigateBack();
      this.loading = false;
    }).catch((error: {issues: Issue[], error: any}) => {
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
      this.editRegistrationDetails.reloadSubjects();
      this.loading = false;
    });
  }

  protected abstract submit(): Promise<RegistrationCRUD>;

  navigateBackToList(): void {
    this.navigateBack();
  }

  navigateBack(): void {
    this.router.navigate(['/registration/registrations']);
  }
}
