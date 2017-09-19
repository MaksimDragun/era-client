import {Component, OnInit} from '@angular/core';
import {MessageType} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {TitleService} from '../../core/services/title.service';
import {CertificateCRUD} from '../models/certificate-crud';
import {RegisteredSpecialty} from '../models/registered-specialty';
import {RegistrationCRUD} from '../models/registration-crud';
import {RegistrationPeriod} from '../models/registration-period';
import {Specialty} from '../models/specialty';
import {RegistrationsService} from '../services/registrations.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';

@Component({
  selector: module.id,
  templateUrl: './registrations-create.component.html'
})
export class RegistrationsCreateComponent implements OnInit {

  registrationPeriods: RegistrationPeriod[];
  selectedPeriod: RegistrationPeriod;

  specialtyList: RegisteredSpecialty[];
  prerogativeList: IMultiSelectOption[];
  outOfCompetitionList: IMultiSelectOption[];
  selectedSpecialty: RegisteredSpecialty;

  documentTypeList = ['P'];
  countryList = ['BY'];

  loading = false;

  registration: RegistrationCRUD = new RegistrationCRUD();

  msTexts: IMultiSelectTexts = {};
  msSettings: IMultiSelectSettings = {};

  constructor(
    private messagesService: MessagesService,
    private registrationsService: RegistrationsService,
    private router: Router,
    private titleService: TitleService,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.initMultiselect();

    this.titleService.setTitleKey('registrations.crud.title-create');
    this.registrationsService.fetchActiveRegistrationPeriods()
      .then((periods: RegistrationPeriod[]) => {
        this.registrationPeriods = periods;
        if (periods && periods[0]) {
          this.selectedPeriod = periods[0];
          this.translate.get('registrations.crud.title-create-with-period', {'period': this.selectedPeriod.title})
            .subscribe(str => this.titleService.setTitleKey(str));
          this.specialtyList = this.selectedPeriod.specialties;
        } else {
          this.messagesService.addMessage({key: 'registrations.common.no-active-registration-period', msgType: MessageType.INFO});
        }

        this.fetchBenefits();

        this.registration.enrollee.document.type = this.documentTypeList[0];
        this.registration.enrollee.address.country = this.countryList[0];
        this.registration.enrollee.document.citizenship = this.countryList[0];
      });
  }

  initMultiselect(): void {
    this.translate.get('common.multiselect.select-all').subscribe(str => this.msTexts.checkAll = str);
    this.translate.get('common.multiselect.unselect-all').subscribe(str => this.msTexts.uncheckAll = str);
    this.translate.get('common.multiselect.item-selected').subscribe(str => this.msTexts.checked = str);
    this.translate.get('common.multiselect.items-selected').subscribe(str => this.msTexts.checkedPlural = str);
    this.translate.get('common.multiselect.select').subscribe(str => this.msTexts.defaultTitle = str);
    this.translate.get('common.multiselect.all-selected').subscribe(str => this.msTexts.allSelected = str);
    this.translate.get('common.multiselect.nothing-to-select').subscribe(str => this.msTexts.searchEmptyResult = str);


    this.msSettings.dynamicTitleMaxItems = 1;
    this.msSettings.showUncheckAll = true;
  }

  fetchBenefits(): void {
    this.registrationsService.fetchBenefits()
      .then(result => {
        this.prerogativeList = result.prerogatives;
        this.outOfCompetitionList = result.outOfCompetitions;
      });
  }

  createRegistrationAccount(): void {
    this.loading = true;
    this.messagesService.reset();
    this.registration.periodId = this.selectedPeriod.id;
    this.registration.educationInstitutionId = this.selectedPeriod.educationInstitution.id;
    this.registration.specialtyId = this.selectedSpecialty && this.selectedSpecialty.id;
    this.registrationsService.createRegistration(this.registration)
      .then(result => {
        this.messagesService.addMessage(
          {
            msgType: MessageType.SUCCESS,
            key: 'registrations.crud.messages.success-created',
            expired: false
          });
        this.router.navigate(['/registrations/list']);
        this.loading = false;
      })
      .catch(error => this.loading = false);
  }

  onSpecialtyChanged(): void {
    this.registration.educationBase = null;
    this.registration.educationForm = null;
    this.registration.fundsSource = null;
  }

  onPeriodChanged(): void {
    this.selectedSpecialty = null;
    this.registration.specialtyId = null;
    this.registration.educationBase = null;
    this.registration.educationForm = null;
    this.registration.fundsSource = null;
  }

  updateCertificate(certificate: CertificateCRUD): void {
    this.registration.certificate = certificate;
  }

}
