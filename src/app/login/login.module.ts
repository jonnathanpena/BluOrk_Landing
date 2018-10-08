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

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angular-6-social-login";

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('497268304074325')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('295092246487-eq2qpgsagj7u7j1pnkt8oggkurrj8idk.apps.googleusercontent.com')
        }
      ]
  );
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    FormsModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxButtonModule,
    SocialLoginModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    ULRProvider,
    LoginProvider,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ]
})

export class LoginModule {}
