import {MessageType} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {TitleService} from '../../core/services/title.service';
import {RegistrationCRUD, RegistrationPeriod, StudyType} from '../models';
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

        this.registration.enrollee.document.type = this.documentTypeList[0];
        this.registration.enrollee.address.country = this.countryList[0];
      })
      .catch(error => this.messagesService.showErrorMessage(error));
  }

  fetchStudyTypeList(): void {
    this.registrationsService.getStudyTypeList()
      .then((list: StudyType[]) => {
        this.studyTypeList = list;
        this.registration.registrationType = list && list[0];
      });
  }

  createRegistrationAccount(): void {
    console.log('Register');
  }
}
