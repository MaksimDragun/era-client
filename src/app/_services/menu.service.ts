import {UserDetails} from '../_models/user-details';
import {AuthenticationService} from './authentication.service';
import {Injectable} from '@angular/core';

export class MenuItem {
  action: string;
  title: string;
  authorities: string[];
  subMenu: MenuItem[];
}

export const mainMenu: MenuItem[] = [
  {
    action: '/registrations',
    title: 'main.menu.registrations.main',
    authorities: [
      'ROLE_REGISTRATIONSVIEW'
    ],
    subMenu: [
      {
        action: '/registrations/list',
        title: 'main.menu.registrations.list',
        authorities: [
          'ROLE_REGISTRATIONSVIEW'
        ],
        subMenu: []
      },
      {
        action: '/registrations/create',
        title: 'main.menu.registrations.create',
        authorities: [
          'ROLE_REGISTRATIONSCREATE'
        ],
        subMenu: []
      }
    ]
  },
  {
    action: '/settings',
    title: 'main.menu.settings.main',
    authorities: [],
    subMenu: [
      {
        action: '/settings/customer-info',
        title: 'main.menu.settings.customer-info',
        authorities: [],
        subMenu: []
      }
    ]
  },
  {
    action: '/administration',
    title: 'main.menu.administration.main',
    authorities: [
      'ROLE_ADMINVIEW'
    ],
    subMenu: [
      {
        action: '/administration/user-accounts',
        title: 'main.menu.registrations.user-accounts',
        authorities: [],
        subMenu: []
      }
    ]
  }
];

@Injectable()
export class MenuService {

  constructor(private authenticationService: AuthenticationService) {}

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
