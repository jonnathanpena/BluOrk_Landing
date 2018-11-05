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
  popupVisible: boolean;
  perfil: any;
  empleado: any;
  tags_empleado: any;
  empleador: any;
  popupVisibleEmployee: boolean;
  popupVisibleEmployer: boolean;
  estados: any;
  ciudades: any;
  tags: any;
  tagsSeleccionados: any;

  constructor(
    private services: SignUpProvider
  ) {}

  ngOnInit() {
    this.perfil = {
      id_prof: '',
      users_id: '',
      city_id: '',
      address_profile: '',
      avatar_prof: '',
      phone_prof: '',
      type_prof: ''
    };
    this.empleado = {
      id_employees: '',
      profile_id: '',
      tax_id_employees: '',
      age_employees: ''
    };
    this.tags_empleado = [];
    this.empleador = {
      id_employers: '',
      profile_id: '',
      name_employers: '',
      tax_id_employers: '',
      type_bussines_employers: '',
      num_employees_employers: '',
      hours_operation_employers: '',
      type_insurance_employers: '',
      bussines_license_employers: ''
    };
    this.popupVisible = true;
    this.popupVisibleEmployee = false;
    this.popupVisibleEmployer = false;
    this.estados = [];
    this.ciudades = [];
    this.tags = [];
    this.tagsSeleccionados = [];
    this.usuario = {
      firstName_users: '',
      lastName_users: '',
      email_users: '',
      password_users: '',
      confirme: ''
    };
    this.guardando = false;
    this.services.statesByCountry({ country_id: 1 }).subscribe(
      response => {
        this.estados = response['data'];
      }
    );
    this.services.allTags().subscribe((response: Response) => {
      this.tags = response['data'];
    });
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

  selectTipo(tipo) {
    this.popupVisible = false;
    if (tipo === 'empleado') {
      this.popupVisibleEmployee = true;
      this.popupVisibleEmployer = false;
    } else if (tipo === 'empleador') {
      this.popupVisibleEmployer = true;
      this.popupVisibleEmployee = false;
    }
  }

  cambioEstado(e) {
    const id = e.value * 1;
    this.getCitiesByState(id);
  }

  getCitiesByState(id) {
    this.services.cityByState({ states_id: id })
      .subscribe(response => {
        this.ciudades = response['data'];
      });
  }

  cambioCiudad(e) {
    const id = e.value * 1;
    this.perfil.city_id = id;
  }

  cambioTags(e) {
    this.tagsSeleccionados = e.value;
    console.log('cambio tags', this.tagsSeleccionados);
  }
}
