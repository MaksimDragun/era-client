import {MessageType, Message} from '../../../core/messages/message';
import {MessagesService} from '../../../core/messages/messages.service';
import {CountryService} from '../../../core/services/country.service';
import {TitleService} from '../../../core/services/title.service';
import {RegistrationCRUD} from '../../models/registration-crud';
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

  protected getTitle(): string {
    return 'registrations.crud.title-create';
  }

  protected fetchRegistration(): Promise<RegistrationCRUD> {
    return new Promise<RegistrationCRUD>((success, error) => success(new RegistrationCRUD()));
  }

  protected submit(): Promise<RegistrationCRUD> {
    return this.registrationsService.createRegistration(this.registration);
  }

  protected getSuccessMessage(reg: RegistrationCRUD): Message {
    return {
      msgType: MessageType.SUCCESS,
      key: 'registrations.crud.messages.success-created',
      params: {registrationId: reg.registrationId},
      expired: false
    };
  }
}
