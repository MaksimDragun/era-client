import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {MainComponent} from './main.component';

import {AuthGuard} from './_guards/index';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // otherwise redirect to home
  {
    path: '**',
    redirectTo: ''
  }
];

export const routing = RouterModule.forRoot(appRoutes);
