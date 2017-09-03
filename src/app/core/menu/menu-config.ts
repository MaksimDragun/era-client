import { MenuItem } from './menu-item';

export const mainMenu: MenuItem[] = [
  {
    action: '/registrations',
    title: 'main.menu.registrations.main',
    authorities: [
      'ROLE_REGISTRATIONS_VIEW'
    ],
    subMenu: [
      {
        action: '/registrations/list',
        title: 'main.menu.registrations.list',
        authorities: [
          'ROLE_REGISTRATIONS_VIEW'
        ],
        subMenu: []
      },
      {
        action: '/registrations/create',
        title: 'main.menu.registrations.create',
        authorities: [
          'ROLE_REGISTRATIONS_CREATE'
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
      'ROLE_ADMIN_VIEW'
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
