import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot, NavigationExtras
} from '@angular/router';

import {AuthenticationService} from './authentication.service';
import {MenuService} from '../menu/menu.service';
import {MenuItem} from '../menu/menu-item';
import {Message, MessageType} from '../messages/message';
import {MessagesService} from '../messages/messages.service';

import {UserDetails} from './user-details';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private menuService: MenuService,
    private messageService: MessagesService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user: any = JSON.parse(localStorage.getItem('currentUser'));
    const userDetails: UserDetails = user && user.userDetails || null;
    if (!userDetails) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
    const menuItem: MenuItem = this.menuService.findMenuItem(state.url);
    if (!this.authenticationService.hasPermissions(userDetails.authorities, menuItem ? menuItem.authorities : [])) {
      this.messageService.addMessage(
        {msgType: MessageType.ERROR, key: 'errors.no-permissions', expired: false});
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
