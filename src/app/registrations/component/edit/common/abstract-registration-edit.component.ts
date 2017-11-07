import {ExamSubjectCRUD} from '../../../../core/certificates/exam-subject-crud';
import {MessageType} from '../../../../core/messages/message';
import {MessagesService} from '../../../../core/messages/messages.service';
import {CountryService} from '../../../../core/services/country.service';
import {TitleService} from '../../../../core/services/title.service';
import {CertificateCRUD} from '../../../models/certificate-crud';
import {PersonCRUD} from '../../../models/person-crud';
import {RegisteredSpecialty} from '../../../models/registered-specialty';
import {RegistrationCRUD} from '../../../models/registration-crud';
import {RegistrationPeriod} from '../../../models/registration-period';
import {RegistrationsService} from '../../../services/registrations.service';
import {EditCertificateModalComponent} from './edit-certificate-modal.component';
import {OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings} from 'angular-2-dropdown-multiselect';

export abstract class AbstractRegistrationEditComponent implements OnInit {

  @ViewChild('editCertificateModal')
  protected editCertificateModal: EditCertificateModalComponent;

  registrationPeriods: RegistrationPeriod[];
  selectedPeriod: RegistrationPeriod;

  specialtyList: RegisteredSpecialty[];
  selectedSpecialty: RegisteredSpecialty;

  prerogativeList: IMultiSelectOption[];
  outOfCompetitionList: IMultiSelectOption[];

  documentTypeList = ['P'];
  countryList: string[];

  loading = false;

  registration: RegistrationCRUD;

  msTexts: IMultiSelectTexts = {};
  msSettings: IMultiSelectSettings = {};

  onlyWarnings = false;

  constructor(
    protected countryService: CountryService,
    protected messagesService: MessagesService,
    protected registrationsService: RegistrationsService,
    protected router: Router,
    protected titleService: TitleService,
    protected translate: TranslateService) {}

  ngOnInit(): void {
    console.log('Abstract edit on init');
    this.initMultiselect();
    this.titleService.setTitleKey(this.getTitles().simple);
    this.fetchRegistration().then(registration => {
      this.registration = registration;
      this.registration.enrollee.document.type = this.registration.enrollee.document.type || this.documentTypeList[0];
      this.registrationsService.fetchActiveRegistrationPeriods().then((periods: RegistrationPeriod[]) => {
          this.registrationPeriods = periods;
          if (periods && periods[0]) {
            this.selectedPeriod = periods[0];
            this.translate.get(this.getTitles().simple, {'period': this.selectedPeriod.title})
              .subscribe(str => this.titleService.setTitleKey(str));
            this.specialtyList = this.selectedPeriod.specialties;
          } else {
            this.messagesService.addMessage({key: 'registrations.common.no-active-registration-period', msgType: MessageType.INFO});
          }

          this.fetchBenefits();
          this.fetchCountries();
        });
    });
  }

  protected abstract fetchRegistration(): Promise<RegistrationCRUD>;

  protected abstract getTitles(): {simple: string, withPeriod: string};

  private initMultiselect(): void {
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

  private fetchCountries(): void {
    this.countryService.fetchList()
      .then(list => {
        this.countryList = list;
        this.registration.enrollee.address.country = this.countryList[0];
        this.registration.enrollee.document.citizenship = this.countryList[0];
      });
  }

  private fetchBenefits(): void {
    this.registrationsService.fetchBenefits()
      .then(result => {
        this.prerogativeList = result.prerogatives;
        this.outOfCompetitionList = result.outOfCompetitions;
      });
  }

  onSpecialtyChanged(): void {
    this.registration.educationBase = null;
    this.registration.educationForm = null;
    this.registration.fundsSource = null;
  }

  onPeriodChanged(): void {
    this.specialtyList = this.selectedPeriod.specialties;
    this.selectedSpecialty = null;
    this.registration.specialtyId = null;
    this.registration.educationBase = null;
    this.registration.educationForm = null;
    this.registration.fundsSource = null;
  }

  updateCertificate(certificate: CertificateCRUD): void {
    this.registration.certificate = certificate;
  }

  updatePayer(payer: {payer: PersonCRUD, enrolleeAsPayer: boolean}): void {
    this.registration.payer = payer.payer;
    this.registration.enrolleeAsPayer = payer.enrolleeAsPayer;
  }

  updateExamSubjects(examSubjectMarks: {subject: ExamSubjectCRUD, mark: number}[]): void {
    this.registration.examSubjectMarks = examSubjectMarks;
  }

  abstract submitRegistration(): void;

}
