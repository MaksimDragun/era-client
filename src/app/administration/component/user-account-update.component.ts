import {Component} from '@angular/core';
import {UserAccountEdit} from '../models';
import {UserAccountEditComponent} from './user-account-edit.component';

@Component({
  moduleId: module.id,
  selector: 'app-user-account-update',
  templateUrl: './user-account-update.component.html'
})
export class UserAccountUpdateComponent extends UserAccountEditComponent {

  submit(): Promise<UserAccountEdit> {
    return this.getUserAccountService().createUserAccount(this.userAccount);
  }

  protected getTitleKey(): string {
    return 'administration.user-accounts.update.title';
  }

  protected getSuccessMessageKey(): string {
    return 'administration.user-accounts.messages.success-updated';
  }

  protected getUserAccountModel(): UserAccountEdit {
    return new UserAccountEdit();
  }
}
