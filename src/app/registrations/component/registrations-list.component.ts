import {MessageType, Message} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {TitleService} from '../../core/services/title.service';
import {Registration, ReportTemplate, RegistrationPeriod, Specialty, StudyType} from '../models';
import {RegistrationsService} from '../services/registrations.service';
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html'
})
export class RegistrationsListComponent implements OnInit {

  registrationList: Registration[];
  reportTemplateList: ReportTemplate[];

  registrationPeriod: RegistrationPeriod;

  selectedReportTemplate: ReportTemplate;

  searchByName: string;
  specialtyList: Specialty[];
  searchBySpecialty: Specialty;
  studyTypeList: StudyType[];
  searchByStudyType: StudyType;

  constructor(
    private messagesService: MessagesService,
    private registrationsService: RegistrationsService,
    private titleService: TitleService,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('registrations.list.title');
    this.registrationsService.fetchRegistrationPeriod()
      .then((period: RegistrationPeriod) => {
        this.registrationPeriod = period;
        if (period) {
          this.translate.get('registrations.list.title-with-period', {'period': period.title})
            .subscribe(str => this.titleService.setTitleKey(str));
          this.fetchValuesForFilters();
          this.fetchReportTemplateList();
          this.fetchRegistrationList();
        } else {
          this.messagesService.addMessage({key: 'registrations.common.no-active-registration-period', msgType: MessageType.INFO});
        }
      })
      .catch(error => this.messagesService.showErrorMessage(error));
  }

  doSearch(): void {
    this.fetchRegistrationList([
      {name: 'name', value: this.searchByName && this.searchByName},
      {name: 'speciality', value: this.searchBySpecialty && this.searchBySpecialty.id},
      {name: 'study-type', value: this.searchByStudyType && this.searchByStudyType.value},
    ]);
  }

  doReset(): void {
    this.searchByName = null;
    this.searchBySpecialty = null;
    this.searchByStudyType = this.studyTypeList && this.studyTypeList[0];
    this.fetchRegistrationList();
  }

  fetchValuesForFilters(): void {
    this.registrationsService.getStudyTypeList()
      .then((list: StudyType[]) => {
        this.studyTypeList = list;
        this.searchByStudyType = list && list[0];
      });
    this.registrationsService.fetchSpecialties(this.registrationPeriod.id)
      .then((specs: Specialty[]) => {
        this.specialtyList = specs;
        this.searchBySpecialty = specs && specs[0];
      });
  }

  fetchRegistrationList(params: {name: string, value: any}[] = []): void {
    params.push({name: 'periodId', value: this.registrationPeriod.id});
    this.registrationsService.fetchRegistrations(params).then(list => this.registrationList = list);
  }

  downloadReport(contractId: number): void {
    this.registrationsService.downloadReport(contractId, this.selectedReportTemplate);
  }

  fetchReportTemplateList(): void {
    this.registrationsService.fetchReportTemplates()
      .then(reportTemplates => {
        this.reportTemplateList = reportTemplates;
        this.selectedReportTemplate = this.reportTemplateList && this.reportTemplateList[0];
      })
      .catch(error => this.messagesService.showErrorMessage(error));

  }

}
