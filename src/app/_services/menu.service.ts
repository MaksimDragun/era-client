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
    title: 'Registrations',
    authorities: [
      'ROLE_REGISTRATIONSVIEW'
    ],
    subMenu: [
      {
        action: '/registrations/list',
        title: 'View List',
        authorities: [
          'ROLE_REGISTRATIONSVIEW'
        ],
        subMenu: []
      },
      {
        action: '/registrations/create',
        title: 'Register',
        authorities: [
          'ROLE_REGISTRATIONSCREATE'
        ],
        subMenu: []
      }
    ]
  },
  {
    action: '/administration',
    title: 'Administration',
    authorities: [
      'ROLE_ADMINVIEW'
    ],
    subMenu: []
  }
];

@Injectable()
export class MenuService {

  getMainMenu(): MenuItem[] {
    return mainMenu;
  }

}
