import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

export const routes: Routes = [
{
    path: '',
    component: AppComponent,
    children: [
        { path: '', redirectTo: '/signup', pathMatch: 'full' },
        { path: 'signup', loadChildren: './signup/signup.component.module#SignUpModule' }
    ]
},
{
    path: '**',
    redirectTo: './signup/signup.component.module#SignUpModule'
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

