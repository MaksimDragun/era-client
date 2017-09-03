import {Injectable} from '@angular/core';

import {Api} from '../core/http/api.service';
import {defaultOptions} from '../core/http/http.utils';

import {UserAccount} from '../_models/user-account';

@Injectable()
export class UserAccountService {

  private fetchUserAccountListUrl = 'api/user-account/get-list';

  constructor(private api: Api) {}

  fetchList(): Promise<UserAccount[]> {
    return this.api.get(this.fetchUserAccountListUrl, defaultOptions());
  }
}
