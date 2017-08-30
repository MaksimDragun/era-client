import {Component, OnInit} from '@angular/core';

import {CustomerDetails} from '../../_models/customer-details';
import {CustomerService} from '../../_services/customer.service';

@Component({
  selector: module.id,
  templateUrl: './customer-info.component.html'
})
export class CustomerInfoComponent implements OnInit {

  customerDetails: CustomerDetails;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchCustomerDetails();
  }

  fetchCustomerDetails(): void {
    this.customerService.fetchRegistrations()
      .then(customerDetails => this.customerDetails = customerDetails)
      .catch(error => console.log(error));
  }

}
