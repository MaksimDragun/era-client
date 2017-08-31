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
    this.fetchRegistrationPeriod()
      .then((period: RegistrationPeriod) => {
        this.registrationPeriod = period;
        this.fetchReportTemplateList();
        this.fetchRegistrationList();
      })
      .catch((error: any) => {
        this.messagesService.addMessage(new Message(MessageType.INFO, 'There is no active registration period'));
      });
  }

  fetchRegistrationPeriod(): Promise<RegistrationPeriod> {
    return new Promise<RegistrationPeriod>((resolve, reject) => {
      resolve(null);
    });
  }

  fetchRegistrationList(): void {
    this.registrationsService.fetchRegistrations()
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
