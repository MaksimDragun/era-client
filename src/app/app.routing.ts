import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/index';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main.component';

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
