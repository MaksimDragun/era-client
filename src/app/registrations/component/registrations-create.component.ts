import {Component, OnInit} from '@angular/core';
import {CertificationService} from '../../core/certificates/certification.service';
import {Subject} from '../../core/certificates/subject';
import {Issue} from '../../core/http/issue';
import {EducationInstitution} from '../../core/institution/education-institution';
import {EducationInstitutionService} from '../../core/institution/education-institution.service';
import {MessageType} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {TitleService} from '../../core/services/title.service';
import {EducationForm, EDUCATION_FORM_LIST} from '../models/education-form';
import {FundsSource, FUNDS_SOURCE_LIST} from '../models/funds-source';
import {RegistrationCRUD} from '../models/registration-crud';
import {RegistrationPeriod} from '../models/registration-period';
import {Specialty} from '../models/specialty';
import {RegistrationsService} from '../services/registrations.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: module.id,
  templateUrl: './registrations-create.component.html'
})
export class RegistrationsCreateComponent implements OnInit {

  registrationPeriod: RegistrationPeriod;
  documentTypeList = ['P'];
  countryList = ['BY'];
  fundsSourceList: FundsSource[];
  educationFormList: EducationForm[];
  eInstitutionList: EducationInstitution[];
  specialtyList: Specialty[];
  subjectList: Subject[];

  loading = false;

  registration: RegistrationCRUD = new RegistrationCRUD();
  errors: Set<string> = new Set();

  constructor(
    private certificationService: CertificationService,
    private educationInstitutionService: EducationInstitutionService,
    private messagesService: MessagesService,
    private registrationsService: RegistrationsService,
    private titleService: TitleService,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('registrations.crud.title-create');
    this.registrationsService.fetchRegistrationPeriod()
      .then((period: RegistrationPeriod) => {
        this.registrationPeriod = period;
        if (period) {
          this.translate.get('registrations.crud.title-create-with-period', {'period': period.title})
            .subscribe(str => this.titleService.setTitleKey(str));
        } else {
          this.messagesService.addMessage({key: 'registrations.common.no-active-registration-period', msgType: MessageType.INFO});
        }

        this.fetchFundsSourceList();
        this.fetchEducationFormList();
        this.fetchEducationalInstitutionList();
        this.fetchSpecialtyList();
        this.fetchSubjectList();

        this.registration.enrollee.document.type = this.documentTypeList[0];
        this.registration.enrollee.address.country = this.countryList[0];
      })
      .catch(error => this.messagesService.showErrorMessage(error));
  }

  fetchFundsSourceList(): void {
    this.fundsSourceList = FUNDS_SOURCE_LIST;
  }

  fetchEducationFormList(): void {
    this.educationFormList = EDUCATION_FORM_LIST;
  }

  fetchEducationalInstitutionList(): any {
    this.educationInstitutionService.fetchEducationInstitutionForRegistrationList()
      .then(list => {
        this.eInstitutionList = list;
        this.registration.educationInstitutionId = this.eInstitutionList && this.eInstitutionList[0].id;
      });
  }

  fetchSpecialtyList(): void {
    this.registrationsService.fetchSpecialties(this.registrationPeriod.id)
      .then(list => this.specialtyList = list);
  }

  fetchSubjectList(): void {
    this.certificationService.fetchSubjectList()
      .then(list => this.registration.certificate.marks =
        list.map(subject => ({subject: subject, mark: null})));
  }

  createRegistrationAccount(): void {
    this.loading = true;
    this.messagesService.reset();
    this.registration.periodId = this.registrationPeriod.id;
    this.registrationsService.createRegistration(this.registration)
      .then(result => this.loading = false)
      .catch(error => {
        this.loading = false;
        this.errors.clear();
        const issues: Issue[] = error as Issue[];
        issues.forEach(issue => {
          this.errors.add(issue.fieldId);
        });
        console.log(this.errors.has('eFirstName'));
      });
  }
}
