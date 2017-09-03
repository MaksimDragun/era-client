import {Component, OnInit} from '@angular/core';

import {TitleService} from '../../core/services/title.service';

import {UserAccount} from '../../_models/user-account';
import {UserAccountService} from '../../_services/user-account.service';

@Component({
  moduleId: module.id,
  templateUrl: 'user-accounts.component.html'
})
export class UserAccountsComponent implements OnInit {

  userAccountList: UserAccount[];

  constructor(
    private titleService: TitleService,
    private userAccountService: UserAccountService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('administration.user-accounts.title');
    this.userAccountService.fetchList()
      .then(list => this.userAccountList = list);
  }


}
