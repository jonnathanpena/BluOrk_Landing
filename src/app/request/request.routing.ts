import { Routes } from '@angular/router';

import { NewRequestComponent } from './new/new-request.component';
import { SearchRequestComponent } from './search/search-request.component';
import { EditRequestComponent } from './edit/edit-request.component';

export const RequestRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SearchRequestComponent
      },
      {
        path: 'new',
        component: NewRequestComponent
      },
      {
        path: 'edit',
        component: EditRequestComponent
      }
    ]
  }
];
