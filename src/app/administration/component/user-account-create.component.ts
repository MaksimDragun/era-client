import {UserAccountCreate} from '../../_models/user-account-create';
import {UserAccountService} from '../../_services/user-account.service';
import {Message, MessageType} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {TitleService} from '../../core/services/title.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-user-account-editor',
  templateUrl: './user-account-create.component.html'
})
export class UserAccountCreateComponent implements OnInit {

  userAccount: UserAccountCreate;

  constructor(
    private messageService: MessagesService,
    private router: Router,
    private titleService: TitleService,
    private userAccountService: UserAccountService) {}

  ngOnInit(): void {
    this.titleService.setTitleKey('administration.user-accounts.create.title');
    this.userAccount = new UserAccountCreate();
  }

  navigateBackToList(): void {
    this.router.navigate(['/administration/user-accounts']);
  }

  createUserAccount(): void {
    this.messageService.reset();
    this.userAccountService.createUserAccount(this.userAccount)
      .then(userAccount => {
        this.messageService.addMessage(
          {
            msgType: MessageType.SUCCESS,
            key: 'administration.user-accounts.create.success-msg',
            params: {'username': userAccount.username},
            expired: false
          });
        this.router.navigate(['/administration/user-accounts']);
      });
  }

  dateChanged(event: any) {
    console.log(event);
  }

}
