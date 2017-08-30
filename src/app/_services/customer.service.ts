import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';

import {defaultOptions} from '../_utils/http.utils';

import {CustomerDetails} from '../_models/customer-details';

@Injectable()
export class CustomerService {

  private fetchCustomerDetailsUrl = 'api/customer/fetch-details';

  constructor(private http: Http) {}

  fetchRegistrations(): Promise<CustomerDetails> {
    return this.http.get(this.fetchCustomerDetailsUrl, defaultOptions()).toPromise()
      .then(response => response.json() as CustomerDetails);
  }

}
