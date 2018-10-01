import { Component, OnInit} from '@angular/core';
import notify from 'devextreme/ui/notify';

import { SignUpProvider } from './signup.providers';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignUpComponent implements OnInit {
  usuario: any;
  guardando: boolean;

  constructor(
    private services: SignUpProvider
  ) {}

  ngOnInit() {
    this.usuario = {
      firstName_users: '',
      lastName_users: '',
      email_users: '',
      password_users: '',
      confirme: ''
    };
    this.guardando = false;
    /*this.services.allUsers().subscribe((response: Response) => {
      console.log('respuesta', response);
    });*/
  }

  signup(e) {
    e.preventDefault();
    this.guardando = true;
    if (this.usuario.password_users !== this.usuario.confirme) {
      this.usuario.password_users = '';
      this.usuario.confirme = '';
      notify('Las claves no coinciden', 'error', 2000);
      this.guardando = false;
    } else {
      this.consultaExistencia();
    }
  }

  consultaExistencia() {
    this.services.userByEmail(this.usuario).subscribe(
      response => this.insert(response)
    );
  }

  insert(response) {
    if (response.data.length > 0) {
      notify('Email ya registrado', 'error', 2000);
    } else {
      this.services.insertUser(this.usuario).subscribe(resp => this.postInsert(resp));
    }
  }

  postInsert(response) {
    if (response > 0) {
      notify('Usuario registrado exitosamente', 'success', 2000);
    } else {
      notify('Algo malo sucedió, por favor, intente nuevamente', 'error', 2000);
    }
    this.cancelar();
  }

  cancelar() {
    this.usuario = {
      firstName_users: '',
      lastName_users: '',
      email_users: '',
      password_users: '',
      confirme: ''
    };
    this.guardando = false;
  }
}
