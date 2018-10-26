import { Component, OnInit} from '@angular/core';
import notify from 'devextreme/ui/notify';

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
      direccion: '',
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

  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
  }

  avatarUploaded(e) {
    this.avatar = this.services.pathTempImage() + e.file.name;
  }

  avatarUploadError(e) {
    console.log('error', e);
  }

}
