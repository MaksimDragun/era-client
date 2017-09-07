import {AuthenticationService} from '../../core/auth/authentication.service';
import {Message, MessageType} from '../../core/messages/message';
import {MessagesService} from '../../core/messages/messages.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {TitleService} from '../../core/services/title.service';
import {RoleHolder, UserAccountCRUD} from '../models';
import {UserAccountService} from '../services/user-account.service';

@Component({
  moduleId: module.id,
  selector: 'app-user-account-editor',
  templateUrl: './user-account-update.component.html'
})
export class UserAccountUpdateComponent implements OnInit {

  userAccount: UserAccountCRUD;

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: TitleService,
    private userAccountService: UserAccountService) {}

  roles: Map<string, RoleHolder[]> = new Map();

  ngOnInit(): void {
    this.titleService.setTitleKey('administration.user-accounts.crud.title-update');
    this.fetchDetails();
  }

  fetchDetails(): void {
    this.route.params.subscribe(params => {
      this.userAccountService.fetchDetails(params['id'])
        .then(account => {
          this.userAccount = account;
          this.userAccount.birthdate = new Date(this.userAccount.birthdate);
          this.populateRoles();
        });
    });
  }

  populateRoles(): void {
    this.authenticationService.getUserDetails()
      .then(userDetails => {
        const tempRoles: RoleHolder[] = [];
        userDetails.authorities.forEach(authority => {
          const parts: string[] = authority.authority.split('_');
          let actions: RoleHolder[] = this.roles.get(parts[1]);
          const foundRole = this.userAccount.roles.find(r => r.role === authority.authority);
          const roleHolder = {
              role: authority.authority,
              enabled: foundRole ? foundRole.enabled : false
            };
          tempRoles.push(roleHolder);
          if (actions) {
            actions.push(roleHolder);
          } else {
            actions = [roleHolder];
            this.roles.set(parts[1], actions);
          }
        });
        this.userAccount.roles = tempRoles;
      });
  }

  navigateBackToList(): void {
    this.router.navigate(['/administration/user-accounts']);
  }

  updateUserAccount(): void {
    this.messageService.reset();
    this.userAccountService.updateUserAccount(this.userAccount)
      .then(userAccount => {
        this.messageService.addMessage(
          {
            msgType: MessageType.SUCCESS,
            key: 'administration.user-accounts.messages.success-updated',
            params: {'username': userAccount.username},
            expired: false
          });
        this.router.navigate(['/administration/user-accounts']);
      });
  }

}
