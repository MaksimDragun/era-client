import {TitleService} from '../../core/services/title.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-user-account-editor',
  templateUrl: './user-account-create.component.html'
})
export class UserAccountCreateComponent implements OnInit {

  constructor(private router: Router, private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('administration.user-accounts.create.title');
  }

  navigateBackToList(): void {
    this.router.navigate(['/administration/user-accounts']);
  }

}
