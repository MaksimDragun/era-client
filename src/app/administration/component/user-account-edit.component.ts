import {OnInit} from '@angular/core';

import {AuthenticationService} from '../../core/auth/authentication.service';
import {Message, MessageType} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {Router} from '@angular/router';
import {UserAccountService} from '../services/user-account.service';
import {TitleService} from '../../core/services/title.service';
import {UserAccountCRUD} from '../models';

export abstract class UserAccountEditComponent implements OnInit {

  userAccount: UserAccountCRUD;

  roles: Map<string, {role: string, enabled: boolean}[]> = new Map();

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessagesService,
    private router: Router,
    private titleService: TitleService,
    private userAccountService: UserAccountService) {}


  ngOnInit(): void {
    this.titleService.setTitleKey(this.getTitleKey());
    this.userAccount = this.getUserAccountModel();
    this.populateRoles();
  }

  protected getUserAccountService(): UserAccountService {
    return this.userAccountService;
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

  protected abstract submit(): Promise<UserAccountCRUD>;

  submitUserAccount(): void {
    this.messageService.reset();
    this.submit().then(userAccount => {
      this.messageService.addMessage(
        {
          msgType: MessageType.SUCCESS,
          key: this.getSuccessMessageKey(),
          params: {'username': userAccount.username},
          expired: false
        });
      this.router.navigate(['/administration/user-accounts']);
    });
  }

  protected abstract getUserAccountModel(): UserAccountCRUD;

  protected abstract getTitleKey(): string;

  protected abstract getSuccessMessageKey(): string;

  navigateBackToList(): void {
    this.router.navigate(['/administration/user-accounts']);
  }

}
