import { Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignUpComponent implements OnInit {
  usuario: any;
  guardando: boolean;

  constructor() {}

  ngOnInit() {
    this.usuario = {
      firstName_users: '',
      lastName_users: '',
      email_users: '',
      password_users: '',
      confirme: ''
    };
    this.guardando = false;
  }

  signup(e) {
    e.preventDefault();
    console.log('usuario', this.usuario);
  }
}
