import {MessageType} from '../../../core/messages/message';
import {MessagesService} from '../../../core/messages/messages.service';
import {TitleService} from '../../../core/services/title.service';
import {RegistrationCRUD} from '../../models/registration-crud';
import {RegistrationDetails} from '../../models/registration-details';
import {ACCEPTED, UNCOMPLETE, CANCELED, NOT_VERIFIED} from '../../models/registration-status';
import {RegistrationsService} from '../../services/registrations.service';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: module.id,
  templateUrl: './registration-details.component.html'
})
export class RegistrationDetailsComponent implements OnInit {

  registration: RegistrationDetails;

  isDownloadBtnDisabled = true;
  isEditBtnDisabled = true;
  isVerificationBtnDisabled = true;
  isCancelBtnDisabled = true;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private registrationService: RegistrationsService,
    private router: Router,
    private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('registrations.details.title');
    this.fetchDetails();
  }

  fetchDetails(): void {
    this.route.params.subscribe(params => {
      this.registrationService.fetchDetails(params['id'])
        .then(registration => {
          this.registration = registration;
          this.setButtonState();
        });
    });
  }

  setButtonState(): void {
    this.isEditBtnDisabled = false;
    this.isDownloadBtnDisabled = UNCOMPLETE.value === this.registration.status || CANCELED.value === this.registration.status;
    this.isCancelBtnDisabled = ACCEPTED.value === this.registration.status || CANCELED.value === this.registration.status;
    this.isVerificationBtnDisabled = NOT_VERIFIED.value !== this.registration.status;
  }

  navigateBackToList(): void {
    this.router.navigate(['/registrations/list']);
  }

  downloadContract(): void {
    this.registrationService.downloadReport(this.registration.id);
  }

  edit(): void {
    this.router.navigate([`/registration/registrations/update/${this.registration.id}`]);
  }

  approve(): void {
    this.loading = true;
    const crud: RegistrationCRUD = new RegistrationCRUD();
    crud.id = this.registration.id;
    crud.version = this.registration.version;
    crud.status = this.registration.status;
    crud.enrollee = this.registration.enrollee;
    this.registrationService.approveRegistration(crud)
      .then(result => {
        this.messagesService.reset();
        this.messagesService.addMessage(
          {
            msgType: MessageType.SUCCESS,
            key: 'registrations.crud.messages.success-approved',
            params: {
              fullName: `${result.enrollee.lastName} `
              + `${result.enrollee.firstName.charAt(0)}.`
              + `${result.enrollee.middleName ? result.enrollee.middleName.charAt(0) : ''}.`
            },
            expired: false
          });
        this.router.navigate(['/registration/registrations/list']);
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
      });
  }

  cancel(): void {
    this.loading = true;
    const crud: RegistrationCRUD = new RegistrationCRUD();
    crud.id = this.registration.id;
    crud.version = this.registration.version;
    crud.status = this.registration.status;
    crud.enrollee = this.registration.enrollee;
    this.registrationService.cancelRegistration(crud)
      .then(result => {
        this.messagesService.reset();
        this.messagesService.addMessage(
          {
            msgType: MessageType.SUCCESS,
            key: 'registrations.crud.messages.success-cancelled',
            params: {
              fullName: `${result.enrollee.lastName} `
              + `${result.enrollee.firstName.charAt(0)}.`
              + `${result.enrollee.middleName ? result.enrollee.middleName.charAt(0) : ''}.`
            },
            expired: false
          });
        this.router.navigate(['/registration/registrations/list']);
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
      });
  }

}
