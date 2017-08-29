import {Registration} from '../../_models/registration';
import {ReportTemplate} from '../../_models/report-template';
import {RegistrationsService} from '../../_services/registrations.service';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html'
})
export class RegistrationsListComponent implements OnInit {

  registrationList: Registration[];
  reportTemplateList: ReportTemplate[];

  selectedReportTemplate: ReportTemplate;

  constructor(
    private registrationsService: RegistrationsService) {}

  ngOnInit(): void {
    this.fetchReportTemplateList();
    this.fetchRegistrationList();
  }

  fetchRegistrationList(): void {
    this.registrationsService.fetchRegistrations()
      .then(registrations => this.registrationList = registrations)
      .catch(error => console.log(error));
  }

  downloadReport(contractId: number): void {
    this.registrationsService.downloadReport(contractId, this.selectedReportTemplate);
  }

  fetchReportTemplateList(): void {
    this.reportTemplateList = [
      {id: 1000, title: 'ContractReport1', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
      {id: 1001, title: 'ContractReport2', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
    ];
    this.selectedReportTemplate = this.reportTemplateList && this.reportTemplateList[0];
  }

}
