import { Component, OnInit} from '@angular/core';
import notify from 'devextreme/ui/notify';

import { LoginProvider } from './login.providers';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  usuario: any;
  guardando: boolean;
  usuarioLoggeado; any = {};

  constructor(
    private services: LoginProvider,
    private socialAuthService: AuthService
  ) {}

  ngOnInit() {
    const usuarioLoggeado = localStorage.getItem('bluork_usuarioLoggeado');
    if (usuarioLoggeado) {
      this.usuarioLoggeado = JSON.parse(usuarioLoggeado);
      console.log(this.usuarioLoggeado);
    } else {
      console.log('No loggeado');
    }
    this.usuario = {
      email_users: '',
      clave: '',
      remember: 0
    };
    this.guardando = false;
    /*this.services.allUsers().subscribe((response: Response) => {
      console.log('respuesta', response);
    });*/
  }

  login(e) {
    e.preventDefault();
    this.services.userByEmail(this.usuario).subscribe(response => {
      if (response['data'].length > 0) {
        if (response['data'][0]['password_users'] === this.usuario.clave) {
            console.log('puede ingresar');
        } else {
          notify('Usuario y/o Clave no coinciden', 'error', 2000);
        }
      } else {
        notify('Usuario no registrado', 'error', 2000);
        this.cancelar();
      }
    });
  }

  cancelar() {
    this.ngOnInit();
  }

  remember(e) {
    if (this.usuario.remember === 0) {
      this.usuario.remember = 1;
    } else {
      this.usuario.remember = 0;
    }
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        // Now sign-in with userData
        // ...
      }
    );
  }
}
