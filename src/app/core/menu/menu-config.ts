import { MenuItem } from './menu-item';

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
        title: 'main.menu.administration.user-accounts',
        authorities: [],
        subMenu: []
      }
    ]
  }
];
