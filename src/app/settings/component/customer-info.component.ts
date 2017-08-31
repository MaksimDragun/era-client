import {Component, OnInit} from '@angular/core';

import {CustomerDetails} from '../../_models/customer-details';
import {CustomerService} from '../../_services/customer.service';
import {TitleService} from '../../core/services/title.service';

@Component({
  selector: module.id,
  templateUrl: './customer-info.component.html'
})
export class CustomerInfoComponent implements OnInit {

  customerDetails: CustomerDetails;

  constructor(
    private customerService: CustomerService,
    private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('settings.customer-info.title');
    this.fetchCustomerDetails();
  }

  fetchCustomerDetails(): void {
    this.customerService.fetchRegistrations()
      .then(customerDetails => this.customerDetails = customerDetails)
      .catch(error => console.log(error));
  }

}
