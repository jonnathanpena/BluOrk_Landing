import { Routes } from '@angular/router';

import { SignUpComponent } from './signup.component';

export const SignUpRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SignUpComponent
      }
    ]
  }
];
