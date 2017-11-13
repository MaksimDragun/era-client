import { MessageType, Message } from '../../../core/messages/message';
import { MessagesService } from '../../../core/messages/messages.service';
import { CountryService } from '../../../core/services/country.service';
import { TitleService } from '../../../core/services/title.service';
import { RegistrationCRUD } from '../../models/registration-crud';
import { RegistrationsService } from '../../services/registrations.service';
import { AbstractRegistrationEditComponent } from './common/abstract-registration-edit.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: module.id,
  templateUrl: './registration-update.component.html'
})
export class RegistrationUpdateComponent extends AbstractRegistrationEditComponent {

  constructor(
    protected route: ActivatedRoute,
    protected countryService: CountryService,
    protected messagesService: MessagesService,
    protected registrationService: RegistrationsService,
    protected router: Router,
    protected titleService: TitleService,
    protected translate: TranslateService) {
    super(countryService, messagesService, registrationService, router, titleService, translate);
  }

  protected getTitle(): string {
    return 'registrations.crud.title-update';
  }

  protected fetchRegistration(): Promise<RegistrationCRUD> {
    return new Promise<RegistrationCRUD>((success, reject) => {
      this.route.params.subscribe(params => {
        this.registrationService.fetchDetails(params['id'])
          .then(crud => {
            return success(crud);
          })
          .catch(error => reject(error));
      });
    });
  }

  protected submit(): Promise<RegistrationCRUD> {
    return this.registrationsService.createRegistration(this.registration);
  }

  protected getSuccessMessage(reg: RegistrationCRUD): Message {
    return {
      msgType: MessageType.SUCCESS,
      key: 'registrations.crud.messages.success-updated',
      params: { registrationId: reg.registrationId },
      expired: false
    };
  }

  navigateBack(): void {
    this.router.navigate([`/registration/registrations/details/${this.registration.id}`]);
  }
}
