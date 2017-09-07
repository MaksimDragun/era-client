import {Injectable} from '@angular/core';
import {Api} from '../../core/http/api.service';
import {defaultOptions} from '../../core/http/http.utils';
import {UserAccount, UserAccountCRUD} from '../models';

@Injectable()
export class UserAccountService {

  private fetchUserAccountListUrl = 'api/user-account/get-list';
  private fetchUserAccountDetailsUrl = 'api/user-account/get-details';
  private createUserAccountUrl = 'api/user-account/create';
  private updateUserAccountUrl = 'api/user-account/update';
  private deleteUserAccountUrl = 'api/user-account/delete';

  constructor(private api: Api) {}

  fetchList(): Promise<UserAccount[]> {
    return this.api.get(this.fetchUserAccountListUrl, defaultOptions());
  }

  fetchDetails(userAccountId: number): Promise<UserAccountCRUD> {
    return this.api.get(`${this.fetchUserAccountDetailsUrl}/${userAccountId}`, defaultOptions());
  }

  createUserAccount(userAccount: UserAccountCRUD): Promise<UserAccountCRUD> {
    return this.api.post(this.createUserAccountUrl, userAccount, defaultOptions());
  }

  updateUserAccount(userAccount: UserAccountCRUD): Promise<UserAccountCRUD> {
    return this.api.post(this.updateUserAccountUrl, userAccount, defaultOptions());
  }

  deleteUserAccount(userAccountId: number): Promise<UserAccount> {
    return this.api.delete(`${this.deleteUserAccountUrl}/${userAccountId}`, defaultOptions());
  }
}
