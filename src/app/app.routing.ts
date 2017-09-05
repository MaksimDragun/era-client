import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './core/login/login.component';
import {MainComponent} from './core/main/main.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const routing = RouterModule.forRoot(appRoutes);
