import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LoginRoutes } from './login.routing';
import { LoginComponent } from './login.component';

import { ULRProvider } from '../providers/url.providers';
import { LoginProvider } from './login.providers';

import {
  DxTextBoxModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxButtonModule
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    FormsModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxButtonModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    ULRProvider,
    LoginProvider
  ]
})

export class LoginModule {}
