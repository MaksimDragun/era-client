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
import {RegisteredSpecialty} from '../models/registered-specialty';
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
  specialtyList: RegisteredSpecialty[];
  selectedSpecialty: RegisteredSpecialty;


  documentTypeList = ['P'];
  countryList = ['BY'];
  fundsSourceList: FundsSource[];
  educationFormList: EducationForm[];
  eInstitutionList: EducationInstitution[];
  subjectList: Subject[];

  loading = false;

  registration: RegistrationCRUD = new RegistrationCRUD();

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
          this.specialtyList = period.specialties;
        } else {
          this.messagesService.addMessage({key: 'registrations.common.no-active-registration-period', msgType: MessageType.INFO});
        }

        this.fetchEducationalInstitutionList();
        this.fetchSubjectList();

        this.registration.enrollee.document.type = this.documentTypeList[0];
        this.registration.enrollee.address.country = this.countryList[0];
        this.registration.enrollee.document.citizenship = this.countryList[0];
      })
      .catch(error => this.messagesService.showErrorMessage(error));
  }

  fetchEducationalInstitutionList(): any {
    this.educationInstitutionService.fetchEducationInstitutionForRegistrationList()
      .then(list => {
        this.eInstitutionList = list;
        this.registration.educationInstitutionId = this.eInstitutionList && this.eInstitutionList[0].id;
      });
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
    this.registration.specialtyId = this.selectedSpecialty && this.selectedSpecialty.id;
    this.registrationsService.createRegistration(this.registration)
      .then(result => this.loading = false)
      .catch(error => this.loading = false);
  }

  onSpecialtyChanged(): void {
    this.registration.educationBase = null;
    this.registration.educationForm = null;
    this.registration.fundsSource = null;
  }

}
