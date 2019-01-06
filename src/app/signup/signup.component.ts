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
  categorias: any;
  scrollByContent: boolean;
  scrollByThumb: boolean;
  scrollbarMode: string;
  pullDown: boolean;
  adult: boolean;
  fotos: any = [];
  urlUpload: string;
  imagenAvatar: string;
  tagSeleccionados: any = [];
  acepta: boolean;
  usuarioLoggeado; any = {};
  private employeeId = 0;

  constructor(
    private services: SignUpProvider
  ) {}

  ngOnInit() {
    this.usuarioLoggeado = {
      logeado: false,
      id_users: '',
      firstName_users: '',
      lastName_users: '',
      email_users: '',
      status_users: '',
      id_prof: '',
      avatar_prof: '',
      city_id: '',
      zipcode_prof: '',
      address_prof: '',
      phone_prof: '',
      type_pro: '',
      skils: []
    };
    this.acepta = false;
    this.tagSeleccionados = [];
    this.urlUpload = this.services.uploadImagen();
    this.imagenAvatar = '';
    this.adult = false;
    this.fotos = [];
    this.perfil = {
      id_prof: '',
      users_id: '',
      city_id: '',
      zipcode_prof: '',
      address_profile: '',
      avatar_prof: '',
      phone_prof: '',
      type_prof: ''
    };
    this.empleado = {
      id_employees: '',
      profile_id: '',
      adult_employees: 1
    };
    this.tags_empleado = [];
    this.empleador = {
      id_employers: '',
      profile_id: '',
      name_employers: '',
      type_bussines_employers: '',
      num_employees_employers: ''
    };
    this.popupVisible = false;
    this.popupVisibleEmployee = false;
    this.popupVisibleEmployer = false;
    this.estados = [];
    this.ciudades = [];
    this.tags = [];
    this.tagsSeleccionados = [];
    this.categorias = [];
    this.services.allCategories().subscribe((response: Response) => {
      this.categorias = response['data'];
    });
    this.usuario = {
      firstName_users: '',
      lastName_users: '',
      email_users: '',
      password_users: '',
      confirme: ''
    };
    this.guardando = true;
    this.services.statesByCountry({ country_id: 1 }).subscribe(
      response => {
        this.estados = response['data'];
      }
    );
    this.services.allSubcategories().subscribe(
      response => {
        this.tags = response['data'];
      }
    );
    this.scrollByContent = true;
    this.scrollByThumb = true;
    this.scrollbarMode = 'onScroll';
    this.pullDown = false;
  }

  signup(e: any) {
    e.preventDefault();
    e.stopPropagation();
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
      this.perfil = {
        id_prof: '',
        users_id: response,
        city_id: 1,
        zipcode_prof: '',
        address_prof: '',
        avatar_prof: '',
        phone_prof: '',
        type_prof: ''
      };
      this.popupVisible = true;
    } else {
      notify('Algo malo sucedió, por favor, intente nuevamente', 'error', 2000);
      this.cancelar();
    }
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

  seSubioImagen(e) {
    console.log('se subió la imagen', e);
    this.perfil.avatar_prof = e.file.name;
    this.imagenAvatar = this.services.pathTempImage() + e.file.name;
    //this.perfil.avatar_prof = this.services.avartarProfileDir() + e.file.name;
  }

  uploadedError(e) {
    console.log('Error en la subida', e);
  }

  onUploadAborted(e) {
    console.log('Abortada la subida', e);
  }

  guardarEmpleado(e) {
    e.preventDefault();
    e.stopPropagation();
    this.perfil.type_prof = 2;
    const file_name = this.perfil.avatar_prof;
    this.perfil.avatar_prof = this.services.avartarProfileDir() + this.perfil.users_id + '/' + file_name;
    this.services.insertProfile(this.perfil).subscribe(
      response => {
        const respuesta: any = response;
        if (respuesta * 1 > 0) {
          this.moverImagenEmpleado(response, file_name);
        } else {
          notify('Algo malo sucedió, por favor, intente nuevamente', 'error', 2000);
        }
      }
    );
  }

  moverImagenEmpleado(id, file_name) {
    this.services.moveImageProfile({ profile_id: this.perfil.users_id, file_name:  file_name}).subscribe(
      data => {
        const respuesta: any = data;
        if (respuesta.success === true) {
          this.insertEmpleado(id);
        } else {
          notify('Algo malo sucedió, por favor, intente nuevamente', 'error', 2000);
          this.popupVisibleEmployee = false;
          this.cancelar();
        }
      }
    );
  }

  insertEmpleado(id) {
    const empleado = {
      profile_id: id
    };
    this.services.insertEmployee(empleado).subscribe(
      response => {
        const respuesta: any = response;
        if (respuesta > 0) {
          this.employeeId = respuesta;
          this.insertSkills(respuesta);
        } else {
          notify('Algo malo sucedió, por favor, intente nuevamente', 'error', 2000);
        }
      }
    );
  }

  insertSkills(id) {
    const skills = [];
    for (let i = 0; i < this.tagsSeleccionados.length; i++) {
      skills.push(
        {
          subcat_id: this.tagsSeleccionados[i],
          employee_id: id
        }
      );
    }
    this.services.insertSkillsEmployee(skills).subscribe(
      response => {
        const respuesta: any = response;
        if (respuesta === true) {
          notify('Usuario creado exitosamente', 'success', 2000);
          this.getUsuarioById('empleado');
        } else {
          notify('Algo malo sucedió, por favor, intente nuevamente', 'error', 2000);
        }
        this.popupVisibleEmployee = false;
        this.cancelar();
      }
    );
  }

  checkAdulto(e) {
    console.log('check adulto', e);
    if (e.value === true) {
      this.guardando = false;
    } else {
      this.guardando = true;
    }
  }

  aceptaTerminos(e) {
    if (this.guardando === false) {
      this.guardando = true;
    } else {
      this.guardando = false;
    }
  }

  getUsuarioById(tipo) {
    this.services.userById({ id_users: this.perfil.users_id }).subscribe(
      response => {
        this.usuarioLoggeado.logeado = true;
        const respuesta: any = response;
        this.usuarioLoggeado.id_users = respuesta.data[0].id_users;
        this.usuarioLoggeado.firstName_users = respuesta.data[0].firstName_users;
        this.usuarioLoggeado.lastName_users = respuesta.data[0].lastName_users;
        this.usuarioLoggeado.email_users = respuesta.data[0].email_users;
        this.usuarioLoggeado.status_users = respuesta.data[0].status_users;
        this.getPerfil(tipo);
      }
    );
  }

  getPerfil(tipo) {
    this.services.profileByUser({ users_id:  this.perfil.users_id}).subscribe(
      response => {
        const respuesta: any = response;
        this.usuarioLoggeado.id_prof = respuesta.data[0].id_prof;
        this.usuarioLoggeado.avatar_prof = respuesta.data[0].avatar_prof;
        this.usuarioLoggeado.city_id = respuesta.data[0].city_id;
        this.usuarioLoggeado.zipcode_prof = respuesta.data[0].zipcode_prof;
        this.usuarioLoggeado.address_prof = respuesta.data[0].address_prof;
        this.usuarioLoggeado.phone_prof = respuesta.data[0].phone_prof;
        this.usuarioLoggeado.type_prof = respuesta.data[0].type_prof;
        if (tipo === 'empleado') {
          this.getSkills();
        }
      }
    );
  }

  getSkills() {
    this.services.getSkillsByEmployee({ employee_id: this.employeeId }).subscribe(
      response => {
        const respuesta: any = response;
        this.usuarioLoggeado.skils = respuesta.data;
        localStorage.setItem('bluork_usuarioLoggeado', JSON.stringify(this.usuarioLoggeado));
      }
    );
  }
}
