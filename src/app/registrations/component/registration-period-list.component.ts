import {Component, OnInit} from '@angular/core';
import {TitleService} from '../../core/services/title.service';
import {RegistrationPeriod} from '../models/registration-period';
import {RegistrationsService} from '../services/registrations.service';

@Component({
  selector: module.id,
  templateUrl: './registration-period-list.component.html'
})
export class RegistrationPeriodListComponent implements OnInit {

  registrationPeriodList: RegistrationPeriod[];

  constructor(private registrationsService: RegistrationsService,
    private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('registrations.periods.list.title');
    this.fetchPeriods();
  }

  fetchPeriods(): void {
    this.registrationsService.fetchRegistrationPeriodList()
      .then(list => {
        this.registrationPeriodList = list.sort((a, b) => a.title.length);
      });
  }
}
