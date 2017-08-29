import {Registration} from '../../_models/registration';
import {RegistrationsService} from '../../_services/registrations.service';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html'
})
export class RegistrationsListComponent implements OnInit {

  registrationList: Registration[];

  constructor(
    private registrationsService: RegistrationsService) {}

  ngOnInit(): void {
    this.fetchRegistrationList();
  }

  fetchRegistrationList(): void {
    this.registrationsService.fetchRegistrations()
      .then(registrations => this.registrationList = registrations)
      .catch(error => console.log(error));
  }

  downloadReport(contractId, number): void {
    this.registrationsService.downloadReport(
      contractId, 'contract.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  }

}
