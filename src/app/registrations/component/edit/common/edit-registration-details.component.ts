import {ExamSubjectCRUD} from '../../../../core/certificates/exam-subject-crud';
import {MessageType} from '../../../../core/messages/message';
import {MessagesService} from '../../../../core/messages/messages.service';
import {TitleService} from '../../../../core/services/title.service';
import {CertificateCRUD} from '../../../models/certificate-crud';
import {PersonCRUD} from '../../../models/person-crud';
import {RegisteredSpecialty} from '../../../models/registered-specialty';
import {RegistrationCRUD} from '../../../models/registration-crud';
import {RegistrationPeriod} from '../../../models/registration-period';
import {RegistrationsService} from '../../../services/registrations.service';
import {EditCertificateModalComponent} from './edit-certificate-modal.component';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption} from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-edit-registration-details',
  templateUrl: './edit-registration-details.component.html'
})
export class EditRegistrationDetailsComponent implements OnInit {

  @ViewChild('editCertificateModal')
  private editCertificateModal: EditCertificateModalComponent;

  @Input() registration: RegistrationCRUD;
  @Input() complexTitle: string;
  @Input() certificateAverageMark = 0;
  @Input() countryList: string[];
  @Input() documentTypeList;

  registrationPeriods: RegistrationPeriod[];
  selectedPeriod: RegistrationPeriod;

  specialtyList: RegisteredSpecialty[];
  selectedSpecialty: RegisteredSpecialty;

  msTexts: IMultiSelectTexts = {};
  msSettings: IMultiSelectSettings = {};

  prerogativeList: IMultiSelectOption[];
  outOfCompetitionList: IMultiSelectOption[];

  constructor(
    protected messagesService: MessagesService,
    protected registrationsService: RegistrationsService,
    protected titleService: TitleService,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.initMultiselect();
    this.fetchBenefits();
    this.registrationsService.fetchActiveRegistrationPeriods().then((periods: RegistrationPeriod[]) => {
      this.registrationPeriods = periods;
      if (periods && periods[0]) {
        this.selectedPeriod = periods[0];
        this.translate.get(this.complexTitle, {'period': this.selectedPeriod.title})
          .subscribe(str => this.titleService.setTitleKey(str));
        this.specialtyList = this.selectedPeriod.specialties;
      } else {
        this.messagesService.addMessage({key: 'registrations.common.no-active-registration-period', msgType: MessageType.INFO});
      }
    });
  }

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

  updateAverageMark(averageMark: number): void {
    this.certificateAverageMark = averageMark;
  }

  updatePayer(payer: {payer: PersonCRUD, enrolleeAsPayer: boolean}): void {
    this.registration.payer = payer.payer;
    this.registration.enrolleeAsPayer = payer.enrolleeAsPayer;
  }

  updateExamSubjects(examSubjectMarks: {subject: ExamSubjectCRUD, mark: number}[]): void {
    this.registration.examSubjectMarks = examSubjectMarks;
  }

  reloadSubjects(): void {
    this.editCertificateModal.reloadSubjects();
  }
}
