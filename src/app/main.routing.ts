import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {MainComponent} from './main.component';

import {AuthGuard} from './_guards/index';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'registrations',
        loadChildren: 'app/registrations/registrations.module#RegistrationsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: 'app/settings/settings.module#SettingsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'administration',
        loadChildren: 'app/administration/administration.module#AdministrationModule',
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [RouterModule]
})
export class MainRoutings {

}
