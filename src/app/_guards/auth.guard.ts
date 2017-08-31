import {UserDetails} from '../_models/user-details';
import {AuthenticationService} from '../_services/authentication.service';
import {MenuService, MenuItem} from '../_services/menu.service';
import { Message, MessageType } from '../core/messages/message';
import { MessagesService } from '../core/messages/messages.service';
import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot, NavigationExtras
} from '@angular/router';

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
      this.messageService.addMessage(new Message(MessageType.ERROR, 'У Вас не прав для совешения данного действия!', false));
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
