import {MessageType, Message} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {TitleService} from '../../core/services/title.service';
import {FundsSource} from '../models/funds-source';
import {RegisteredSpecialty} from '../models/registered-specialty';
import {Registration} from '../models/registration';
import {RegistrationPeriod} from '../models/registration-period';
import {RegistrationSearchQuery} from '../models/registration-search-query';
import {RegistrationsService} from '../services/registrations.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html'
})
export class RegistrationsListComponent implements OnInit {

  registrationList: Registration[];

  registrationPeriods: RegistrationPeriod[];
  selectedPeriod: RegistrationPeriod;

  selectedSpecialty: RegisteredSpecialty;

  searchQuery = new RegistrationSearchQuery();

  constructor(
    private messagesService: MessagesService,
    private registrationsService: RegistrationsService,
    private router: Router,
    private titleService: TitleService,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('registrations.list.title');
    this.registrationsService.fetchActiveRegistrationPeriods()
      .then((periods: RegistrationPeriod[]) => {
        this.registrationPeriods = periods;
        if (periods && periods[0]) {
          this.translate.get('registrations.list.title-with-period', {'period': periods[0].title})
            .subscribe(str => this.titleService.setTitleKey(str));
          this.selectedPeriod = this.registrationPeriods && this.registrationPeriods[0];
          this.selectedSpecialty = this.selectedPeriod.specialties && this.selectedPeriod.specialties[0];
          this.resetSpecialities();
          this.doReset();
        } else {
          this.messagesService.addMessage({key: 'registrations.common.no-active-registration-period', msgType: MessageType.INFO});
        }
      })
      .catch(error => this.messagesService.showErrorMessage(error));
  }

  fetchRegistrationList(params: {name: string, value: any}[] = []): void {
    this.registrationsService.fetchRegistrations(params).then(list => this.registrationList = list);
  }

  doSearch(): void {
    this.fetchRegistrationList([
      {name: 'period', value: this.selectedPeriod && this.selectedPeriod.id},
      {name: 'education-institution', value: this.selectedPeriod && this.selectedPeriod.educationInstitution.id},
      {name: 'specialty', value: this.selectedSpecialty && this.selectedSpecialty.id},
      {name: 'registration-id', value: this.searchQuery.registrationId},
      {name: 'name', value: this.searchQuery.enrolleeName},
      {name: 'funds-source', value: this.searchQuery.fundsSource},
      {name: 'education-form', value: this.searchQuery.educationForm},
      {name: 'education-base', value: this.searchQuery.educationBase},
    ]);
  }

  doReset(): void {
    this.searchQuery.registrationId = null;
    this.searchQuery.enrolleeName = null;
    this.doSearch();
  }

  onPeriodChanged(): void {
    this.selectedSpecialty = this.selectedPeriod.specialties && this.selectedPeriod.specialties[0];
    this.resetSpecialities();
    this.searchQuery.registrationId = null;
    this.searchQuery.enrolleeName = null;
    this.doSearch();
  }

  onSpecialtyChanged(): void {
    this.resetSpecialities();
    this.doSearch();
  }

  resetSpecialities(): void {
    if (this.selectedSpecialty) {
      this.searchQuery.educationBase = this.selectedSpecialty.separateByEducationBase ? this.selectedSpecialty.educationBases[0] : null;
      this.searchQuery.educationForm = this.selectedSpecialty.separateByEducationForm ? this.selectedSpecialty.educationForms[0] : null;
      this.searchQuery.fundsSource = this.selectedSpecialty.separateByFundsSource ? this.selectedSpecialty.fundsSources[0] : null;
    }
  }

  downloadReport(contractId: number): void {
    this.registrationsService.downloadReport(contractId);
  }

  navigateToCreate(registrationId: number): void {
    this.router.navigate([`/registration/registrations/create`]);
  }

  navigateToDetails(registrationId: number): void {
    this.router.navigate([`/registration/registrations/details/${registrationId}`]);
  }

}
