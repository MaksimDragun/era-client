import {MessageType} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {TitleService} from '../../core/services/title.service';
import {RegistrationCRUD, RegistrationPeriod, StudyType, STUDY_TYPES, Speciality, Subject} from '../models';
import {RegistrationsService} from '../services/registrations.service';
import {Component, OnInit} from '@angular/core';
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
  eInstitutionList: any[];
  specialityList: Speciality[];
  subjectList: Subject[];

  registration: RegistrationCRUD = new RegistrationCRUD();

  constructor(
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
        this.fetchSpecialityList();
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
    this.eInstitutionList = [{name: 'MRK', id: 1000, code: '11101101'}];
    this.registration.educationInstitutionId = this.eInstitutionList && this.eInstitutionList[0].id;
  }

  fetchSpecialityList(): void {
    this.registrationsService.fetchSpecialities(this.registrationPeriod.id)
      .then(list => this.specialityList = list);
  }

  fetchSubjectList(): void {
    this.subjectList = [
      {id: 1000, title: 'Math'},
      {id: 1001, title: 'Foreign language'},
      {id: 1002, title: 'Belarussian'},
      {id: 1003, title: 'Russian'},
      {id: 1004, title: 'Literture'},
      {id: 1005, title: 'Physics'},
      {id: 1006, title: 'Chemistry'}];
  }

  createRegistrationAccount(): void {
    console.log('Register');
  }
}
