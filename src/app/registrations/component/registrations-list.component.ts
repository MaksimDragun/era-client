import {Registration} from '../../_models/registration';
import {RegistrationPeriod} from '../../_models/registration-period';
import {ReportTemplate} from '../../_models/report-template';
import {RegistrationsService} from '../../_services/registrations.service';
import {MessageType, Message} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {TitleService} from '../../core/services/title.service';
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
          this.fetchReportTemplateList();
          this.fetchRegistrationList();
        } else {
          this.messagesService.addMessage({key: 'registrations.common.no-active-registration-period', msgType: MessageType.INFO});
        }
      })
      .catch(error => this.messagesService.showErrorMessage(error));
  }


  fetchRegistrationList(): void {
    this.registrationsService.fetchRegistrations([{name: 'periodId', value: this.registrationPeriod.id}])
      .then(registrations => this.registrationList = registrations)
      .catch(error => this.messagesService.showErrorMessage(error));
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
