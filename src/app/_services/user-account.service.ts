import {Injectable} from '@angular/core';

import {Api} from '../core/http/api.service';
import {defaultOptions} from '../core/http/http.utils';

import {UserAccount} from '../_models/user-account';
import {UserAccountCreate} from '../_models/user-account-create';

@Injectable()
export class UserAccountService {

  private fetchUserAccountListUrl = 'api/user-account/get-list';
  private createUserAccountUrl = 'api/user-account/create';

  constructor(private api: Api) {}

  fetchList(): Promise<UserAccount[]> {
    return this.api.get(this.fetchUserAccountListUrl, defaultOptions());
  }

  createUserAccount(userAccount: UserAccountCreate): Promise<UserAccountCreate> {
    return this.api.post(this.createUserAccountUrl, userAccount, defaultOptions());
  }
}
