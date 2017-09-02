import {Injectable} from '@angular/core';

import {mainMenu} from './menu-config';
import {MenuItem} from './menu-item';

import {AuthenticationService} from '../auth/authentication.service';

import {UserDetails} from '../../_models/user-details';

@Injectable()
export class MenuService {

  constructor(private authenticationService: AuthenticationService) {
    for (const item of mainMenu) {
      for (const subItem of item.subMenu) {
        subItem.authorities = subItem.authorities.concat(item.authorities);
      }
    }
  }

  getMainMenu(): MenuItem[] {
    const userMainMenu: MenuItem[] = [];
    this.authenticationService.getUserDetails()
      .then((userDetails: UserDetails) => {
        for (const item of mainMenu) {
          if (this.authenticationService.hasPermissions(userDetails.authorities, item.authorities)) {
            const userItem: MenuItem = new MenuItem();
            userItem.action = item.action;
            userItem.title = item.title;
            userItem.subMenu = [];
            userMainMenu.push(userItem);
            for (const subItem of item.subMenu) {
              if (this.authenticationService.hasPermissions(userDetails.authorities, subItem.authorities)) {
                const userSubItem: MenuItem = new MenuItem();
                userSubItem.action = subItem.action;
                userSubItem.title = subItem.title;
                userItem.subMenu.push(userSubItem);
              }
            }
          }
        }
      });
    return userMainMenu;
  }

  findMenuItem(url: string): MenuItem {
    for (const item of mainMenu) {
      if (url === item.action) {
        return item;
      }
      for (const subItem of item.subMenu) {
        if (url === subItem.action) {
          return subItem;
        }
      }
    }
  }
}
