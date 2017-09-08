import {Component, OnInit} from '@angular/core';
import {CertificationService} from '../../core/certificates/certification.service';
import {Subject} from '../../core/certificates/subject';
import {EducationInstitution} from '../../core/institution/education-institution';
import {EducationInstitutionService} from '../../core/institution/education-institution.service';
import {MessageType} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {TitleService} from '../../core/services/title.service';
import {RegistrationCRUD, RegistrationPeriod, StudyType, STUDY_TYPES, Specialty} from '../models';
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
  studyTypeList: StudyType[];
  eInstitutionList: EducationInstitution[];
  specialtyList: Specialty[];
  subjectList: Subject[];

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
        } else {
          this.messagesService.addMessage({key: 'registrations.common.no-active-registration-period', msgType: MessageType.INFO});
        }

        this.fetchStudyTypeList();
        this.fetchEducationalInstitutionList();
        this.fetchSpecialtyList();
        this.fetchSubjectList();

        this.registration.enrollee.document.type = this.documentTypeList[0];
        this.registration.enrollee.address.country = this.countryList[0];
      })
      .catch(error => this.messagesService.showErrorMessage(error));
  }

  fetchStudyTypeList(): void {
    this.studyTypeList = STUDY_TYPES;
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
    console.log(this.registration);
  }
}
