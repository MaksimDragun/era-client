import {Component, OnInit} from '@angular/core';

import {TitleService} from '../../core/services/title.service';

import {UserAccount} from '../../_models/user-account';
import {UserAccountService} from '../../_services/user-account.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'user-accounts.component.html'
})
export class UserAccountsComponent implements OnInit {

  userAccountList: UserAccount[];

  selectedUserAccount: UserAccount;

  constructor(
    private router: Router,
    private titleService: TitleService,
    private userAccountService: UserAccountService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('administration.user-accounts.title');
    this.userAccountService.fetchList()
      .then(list => this.userAccountList = list);
  }

  selectUserAccount(userAccount: UserAccount): void {
    this.selectedUserAccount = userAccount;
  }

  navigateToCreate(): void {
    this.router.navigate(['/administration/user-accounts/create']);
  }


}
