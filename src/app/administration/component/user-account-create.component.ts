import {AuthenticationService} from '../../core/auth/authentication.service';
import {Message, MessageType} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TitleService} from '../../core/services/title.service';
import {UserAccountCreate} from '../models';
import {UserAccountService} from '../services/user-account.service';

@Component({
  moduleId: module.id,
  selector: 'app-user-account-editor',
  templateUrl: './user-account-create.component.html'
})
export class UserAccountCreateComponent implements OnInit {

  userAccount: UserAccountCreate;

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessagesService,
    private router: Router,
    private titleService: TitleService,
    private userAccountService: UserAccountService) {}

  roles: Map<string, {role: string, enabled: boolean}[]> = new Map();

  ngOnInit(): void {
    this.titleService.setTitleKey('administration.user-accounts.create.title');
    this.userAccount = new UserAccountCreate();
    this.populateRoles();
  }

  populateRoles(): void {
    this.authenticationService.getUserDetails()
      .then(userDetails => {
        userDetails.authorities.forEach(authority => {
          const parts: string[] = authority.authority.split('_');
          let actions: {role: string, enabled: boolean}[] = this.roles.get(parts[1]);
          const roleHolder = {role: authority.authority, enabled: false};
          this.userAccount.roles.push(roleHolder);
          if (actions) {
            actions.push(roleHolder);
          } else {
            actions = [roleHolder];
            this.roles.set(parts[1], actions);
          }
        });
      });
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
            key: 'administration.user-accounts.messages.success-created',
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
