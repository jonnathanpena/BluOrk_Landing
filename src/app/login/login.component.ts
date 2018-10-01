import { Component, OnInit} from '@angular/core';
import notify from 'devextreme/ui/notify';

import { LoginProvider } from './login.providers';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  usuario: any;
  guardando: boolean;

  constructor(
    private services: LoginProvider
  ) {}

  ngOnInit() {
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
}
