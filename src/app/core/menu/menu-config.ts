import { MenuItem } from './menu-item';

export const mainMenu: MenuItem[] = [
  {
    action: '/registration',
    title: 'main.menu.registrations.main',
    authorities: [
      'ROLE_REGISTRATIONS_VIEW'
    ],
    subMenu: [
      {
        action: '/registration/registrations',
        title: 'main.menu.registrations.list',
        authorities: [
          'ROLE_REGISTRATIONS_VIEW'
        ],
        subMenu: []
      },
      {
        action: '/registration/periods',
        title: 'main.menu.registrations.periods',
        authorities: [],
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
    authorities: [],
    subMenu: [
      {
        action: '/administration/user-accounts',
        title: 'main.menu.administration.user-accounts',
        authorities: [
          'ROLE_USERACCOUNTS_VIEW'
        ],
        subMenu: []
      }
    ]
  }
];
