import {TitleService} from '../../../core/services/title.service';
import {RegistrationCRUD} from '../../models/registration-crud';
import {RegistrationsService} from '../../services/registrations.service';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: module.id,
  templateUrl: './registration-details.component.html'
})
export class RegistrationsDetailsComponent implements OnInit {

  registration: RegistrationCRUD;

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationsService,
    private router: Router,
    private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('registrations.details.title');
    this.fetchDetails();
  }

  fetchDetails(): void {
    this.route.params.subscribe(params => {
      this.registrationService.fetchDetails(params['id'])
        .then(registration => {
          this.registration = registration;
        });
    });
  }

  navigateBackToList(): void {
    this.router.navigate(['/registrations/list']);
  }
}
