import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { RequestRoutes } from './request.routing';
import { NewRequestComponent } from './new/new-request.component';
import { SearchRequestComponent } from './search/search-request.component';
import { EditRequestComponent } from './edit/edit-request.component';

import { ULRProvider } from '../providers/url.providers';
import { RequestProvider } from './request.providers';

import {
  DxTextBoxModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxButtonModule,
  DxSelectBoxModule,
  DxTagBoxModule,
  DxCheckBoxModule,
  DxRangeSelectorModule,
  DxMapModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxFormModule,
  DxAutocompleteModule,
  DxTooltipModule,
  DxTemplateModule,
  DxFileUploaderModule
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RequestRoutes),
    FormsModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxTagBoxModule,
    DxCheckBoxModule,
    DxRangeSelectorModule,
    DxMapModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    DxAutocompleteModule,
    DxTooltipModule,
    DxTemplateModule,
    DxFileUploaderModule
  ],
  declarations: [
    NewRequestComponent,
    SearchRequestComponent,
    EditRequestComponent
  ],
  providers: [
    ULRProvider,
    RequestProvider
  ]
})

export class RequestModule {}
