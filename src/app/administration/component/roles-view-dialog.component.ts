import {UserAccount} from '../../_models/user-account';
import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-roles-view-dialog',
  templateUrl: './roles-view-dialog.component.html'
})
export class RolesViewDialogComponent implements OnChanges {

  @Input() selectedUserAccount: UserAccount;

  roles: Map<string, string[]> = new Map();

  initialized: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    this.initialized = false;
    const change: SimpleChange = changes['selectedUserAccount'];
    if (change && change.currentValue) {
      this.roles.clear();
      const userAccount: UserAccount = change.currentValue;
      userAccount.roles.forEach(role => {
        const parts: string[] = role.split('_');
        let actions: string[] = this.roles.get(parts[1]);
        if (actions) {
          actions.push(role);
        } else {
          actions = [role];
          this.roles.set(parts[1], actions);
        }
      });
    }
    this.initialized = true;
  }

}
