import {Component, OnInit} from '@angular/core';

import {TitleService} from '../../core/services/title.service';

@Component({
  moduleId: module.id,
  templateUrl: 'user-accounts.component.html'
})
export class UserAccountsComponent implements OnInit {

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('administration.user-accounts.title');
  }


}
