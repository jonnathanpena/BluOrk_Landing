import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

export const routes: Routes = [
{
    path: '',
    component: AppComponent,
    children: [
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'signup', loadChildren: './signup/signup.component.module#SignUpModule' },
        { path: 'login', loadChildren: './login/login.module#LoginModule'}
    ]
},
{
    path: '**',
    redirectTo: './login/login.module#LoginModule'
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

