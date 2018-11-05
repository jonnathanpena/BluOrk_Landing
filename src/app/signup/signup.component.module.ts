import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SignUpRoutes } from './signup.routing';
import { SignUpComponent } from './signup.component';

import { ULRProvider } from '../providers/url.providers';
import { SignUpProvider } from './signup.providers';

import {
  DxTextBoxModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxButtonModule,
  DxPopupModule,
  DxTemplateModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxFormModule,
  DxTagBoxModule
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SignUpRoutes),
    FormsModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxButtonModule,
    DxPopupModule,
    DxTemplateModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    DxTagBoxModule
  ],
  declarations: [
    SignUpComponent
  ],
  providers: [
    ULRProvider,
    SignUpProvider
  ]
})

export class SignUpModule {}
