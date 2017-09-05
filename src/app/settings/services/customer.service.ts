import {Injectable} from '@angular/core';
import {Api} from '../../core/http/api.service';
import {defaultOptions} from '../../core/http/http.utils';
import {CustomerDetails} from '../models';

@Injectable()
export class CustomerService {

  private fetchCustomerDetailsUrl = 'api/customer/fetch-details';

  constructor(private api: Api) {}

  fetchRegistrations(): Promise<CustomerDetails> {
    return this.api.get(this.fetchCustomerDetailsUrl, defaultOptions());
  }

}
