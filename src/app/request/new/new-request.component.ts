import { Component, OnInit, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';
import {
  DxSelectBoxComponent,
  DxTagBoxComponent
} from 'devextreme-angular';

import { RequestProvider } from '../request.providers';

@Component({
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})

export class NewRequestComponent implements OnInit {
  guardando: boolean;
  markers: any = [];
  markerUrl: string;
  customMarkerUrl: string;
  mapMarkerUrl: string;
  categorias: any = [];
  subcategorias: any = [];
  tags: any = [];
  request: any = {};
  address: any = [];
  fullInfo: string;
  paises: any = [];
  estados: any = [];
  ciudades: any = [];
  avatar: string;
  defaultVisible: boolean;
  image: any;
  url: string;
  tagsSeleccionados = [];

  @ViewChild(DxSelectBoxComponent) selectBoxCategoria: DxSelectBoxComponent;
  @ViewChild(DxSelectBoxComponent) selectBoxSubCategoria: DxSelectBoxComponent;
  @ViewChild(DxSelectBoxComponent) selectBoxEstados: DxSelectBoxComponent;
  @ViewChild(DxSelectBoxComponent) selectBoxCiudades: DxSelectBoxComponent;
  @ViewChild(DxTagBoxComponent) tagsBox: DxTagBoxComponent;

  constructor(
    private services: RequestProvider
  ) {}

  ngOnInit() {
    this.markerUrl = 'https://js.devexpress.com/Demos/RealtorApp/images/map-marker.png';
    this.avatar = '../../../assets/img/placeholders/avatars/avatar1.jpg';
    this.defaultVisible = false;
    this.url = this.services.uploadImage();
    this.image = [];
    this.markers = [
      {
        location: [40.755833, -73.986389],
        tooltip: {
          isShown: false,
          text: 'Times Square'
        }
      }
    ];
    this.subcategorias = [];
    this.services.allCategories().subscribe((response: Response) => {
      this.categorias = response['data'];
    });
    this.services.allTags().subscribe((response: Response) => {
      this.tags = response['data'];
    });
    this.services.statesByCountry({ country_id: 1 }).subscribe(
      response => this.listaEstados(response['data'])
    );
    this.request = {
      detsubcat_id: '',
      avatar_req: '',
      title_req: '',
      description_req: '',
      city_id: '',
      zipcode_req: '',
      address_req: '',
      lat_req: 40.755833,
      long_req: -73.986389,
      employment_type_id: 5,
      payAmount_req: '',
      createBy_req: 9
    };
    this.address = [
      'New York',
      'Miami',
      'Long Island'
    ];
    this.ciudades = [
      {
        id: 1,
        name: 'Miami'
      }
    ];
    this.selectBoxCategoria.value = null;
    this.selectBoxSubCategoria.value = null;
    this.selectBoxEstados.value = null;
    this.selectBoxCiudades.value = null;
    this.tagsBox.value = null;
  }

  listaEstados(estados) {
    this.estados = estados;
  }

  checkCustomMarker(data) {
    this.mapMarkerUrl = data.value ? this.customMarkerUrl : null;
  }
  showTooltips() {
    this.markers = this.markers.map(function (item) {
        item.tooltip.isShown = true;
        return item;
    });
  }

  updateAddress() {
    let result = '';
    result += ((this.request.direccion || '') + ' ' + (this.request.direccion || '')).trim();
    this.fullInfo = result;
  }

  cambioCategoria(e) {
    const id = e.value * 1;
    this.getSubcategoriesByCategory(id);
  }

  getSubcategoriesByCategory(id) {
    this.services.subcategoriesByCategory({ category_id: id }).subscribe(
      response => this.listarSubcategorias(response['data'])
    );
  }

  listarSubcategorias(subcategorias) {
    this.subcategorias = subcategorias;
  }

  cambioSubcategoria(e) {
    const id = e.value * 1;
    this.request.detsubcat_id = id;
  }

  cambioEstado(e) {
    const id = e.value * 1;
    this.getCitiesByState(id);
  }

  getCitiesByState(id) {
    this.services.cityByState({ states_id: id })
      .subscribe(response => this.listarCiudades(response['data']));
  }

  listarCiudades(cities) {
    this.ciudades = cities;
  }

  cambioCiudad(e) {
    const id = e.value * 1;
    this.request.city_id = id;
  }

  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
  }

  avatarUploaded(e) {
    console.log('imagenes', this.image);
    this.avatar = this.services.pathTempImage() + e.file.name;
    this.request.avatar_req = e.file.name;
  }

  avatarUploadError(e) {
    console.log('error', e);
  }

  cancelar() {
    this.selectBoxEstados.value = null;
    this.selectBoxCiudades.value = null;
    this.request.avatar_req = '';
    this.request.title_req = '';
    this.request.description_req = '';
    this.request.zipcode_req = '';
    this.request.address_req = '';
    this.request.payAmount_req = '';
    this.avatar = '../../../assets/img/placeholders/avatars/avatar1.jpg';
    this.selectBoxCategoria.value = null;
    this.selectBoxSubCategoria.value = null;
    this.tagsBox.value = null;
    this.tagsSeleccionados = [];
  }

  guardar(e) {
    e.preventDefault();
    this.guardando = true;
    if (this.request.detsubcat_id === '' || this.request.city_id === '') {
      this.guardando = false;
      notify('Todos los campos con * son obligatorios', 'error', 2000);
      this.cancelar();
    } else {
      this.services.insertRequest(this.request)
        .subscribe(response => this.luegoDeGuardar(response));
    }
  }

  luegoDeGuardar(response) {
    if (response > 0) {
      this.insertarTagsRequest(response);
    } else {
      notify('Comprueba tu conexión a internet e intenta nuevamente', 'error', 2000);
      this.guardando = false;
      this.cancelar();
    }
  }

  insertarTagsRequest(id) {
    if (this.avatar !== '../../../assets/img/placeholders/avatars/avatar1.jpg') {
      this.moveImageRequest(id);
    }
    let success = true;
    for (let i = 0; i < this.tagsSeleccionados.length; i++) {
      if (this.insertTagsRequest(id, this.tagsSeleccionados[i]) === false) {
        success = false;
      }
    }
    this.cancelar();
    setTimeout(function() {
      if (success === false) {
        notify('Comprueba tu conexión a internet e intenta nuevamente', 'error', 2000);
      } else {
        notify('Guardado exitosamente', 'success', 2000);
      }
    }, 2000);
  }

  insertTagsRequest(id_request, id_tags): any {
    let success;
    this.services.insertRequestTags({ request_id: id_request, tags_id: id_tags })
      .subscribe(response => {
        success = response;
        return success;
      });
  }

  moveImageRequest(id) {
    this.services.moveImageRequest({ request_id: id, file_name: this.request.avatar_req })
      .subscribe(response => {
        console.log('move image', response);
      });
  }

  cambioTags(e) {
    this.tagsSeleccionados = e.value;
    console.log('cambio tags', this.tagsSeleccionados);
  }

}
