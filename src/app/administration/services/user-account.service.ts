import {Injectable} from '@angular/core';
import {Api} from '../../core/http/api.service';
import {defaultOptions} from '../../core/http/http.utils';
import {UserAccount, UserAccountEdit} from '../models';

@Injectable()
export class UserAccountService {

  private fetchUserAccountListUrl = 'api/user-account/get-list';
  private createUserAccountUrl = 'api/user-account/create';
  private deleteUserAccountUrl = 'api/user-account/delete';

  constructor(private api: Api) {}

  fetchList(): Promise<UserAccount[]> {
    return this.api.get(this.fetchUserAccountListUrl, defaultOptions());
  }

  createUserAccount(userAccount: UserAccountEdit): Promise<UserAccountEdit> {
    return this.api.post(this.createUserAccountUrl, userAccount, defaultOptions());
  }

  deleteUserAccount(userAccount: UserAccount): Promise<UserAccount> {
    return this.api.delete(`${this.deleteUserAccountUrl}/${userAccount.id}`, defaultOptions());
  }
}
