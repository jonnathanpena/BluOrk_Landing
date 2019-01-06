import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import notify from 'devextreme/ui/notify';

import { RequestProvider } from '../request.providers';

import {
  DxSelectBoxComponent,
  DxTagBoxComponent
} from 'devextreme-angular';

@Component({
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss']
})

export class EditRequestComponent implements OnInit {
  guardando: boolean;
  id: string;
  request: any = {};
  avatar: string;
  markers: any = [];
  markerUrl: string;
  customMarkerUrl: string;
  mapMarkerUrl: string;
  categorias: any = [];
  subcategorias: any = [];
  tags: any = [];
  fullInfo: string;
  paises: any = [];
  estados: any = [];
  ciudades: any = [];
  defaultVisible: boolean;
  image: any;
  url: string;
  tagsSeleccionados = [];
  city: any;
  state: any;
  categoria: any;
  subcategoria: any;
  contador: number;
  usuarioLoggeado: any = {};

  @ViewChild(DxSelectBoxComponent) selectBoxCategoria: DxSelectBoxComponent;
  @ViewChild(DxSelectBoxComponent) selectBoxSubCategoria: DxSelectBoxComponent;
  @ViewChild(DxSelectBoxComponent) selectBoxEstados: DxSelectBoxComponent;
  @ViewChild(DxSelectBoxComponent) selectBoxCiudades: DxSelectBoxComponent;
  @ViewChild(DxTagBoxComponent) tagsBox: DxTagBoxComponent;

  constructor(
    private services: RequestProvider,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const usuarioLoggeado = localStorage.getItem('bluork_usuarioLoggeado');
    if (usuarioLoggeado) {
      this.usuarioLoggeado = JSON.parse(usuarioLoggeado);
      console.log(this.usuarioLoggeado);
    } else {
      console.log('No loggeado');
    }
    this.contador = 0;
    this.categoria = '';
    this.subcategoria = '1';
    this.state = '';
    this.city = '';
    this.markerUrl = 'https://js.devexpress.com/Demos/RealtorApp/images/map-marker.png';
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
    this.id = atob(this.route.snapshot.params.request);
    this.services.requestById({ id_req: this.id })
      .subscribe(response => {
        this.request = response['data'][0];
        console.log('job', this.request);
        this.avatar = this.services.avartarRequestDir() + this.id + '/' + this.request.avatar_req;
        this.getCity(this.request.city_id);
        this.getDetSubcatById(this.request.detsubcat_id);
      });
    this.subcategorias = [];
    this.services.allCategories().subscribe((response: Response) => {
      this.categorias = response['data'];
    });
    this.services.allTags().subscribe((response: Response) => {
      this.tags = response['data'];
    });
    this.services.statesByCountry({ country_id: 1 }).subscribe(
      response => {
        this.estados = response['data'];
      }
    );
    this.ciudades = [];
  }

  avatarUploaded(e) {
    console.log('imagenes', this.image);
    this.avatar = this.services.pathTempImage() + e.file.name;
    this.request.avatar_req = e.file.name;
  }

  avatarUploadError(e) {
    console.log('error', e);
  }

  getCity(id) {
    this.services.cityById({ id_cities:  id})
      .subscribe(response => {
        console.log('city', response);
        this.state = response['data'][0]['states_id'];
        this.getCitiesByState(response['data'][0]['states_id']);
      });
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
    setTimeout(() => {
      this.city = `${this.request.city_id}`;
    }, 200);
  }

  cambioCiudad(e) {
    const id = e.value * 1;
    this.request.city_id = id;
  }

  getDetSubcatById(id) {
    this.services.detSubcatById({ id_detsubcat: id })
      .subscribe(response => {
        console.log('detsubcat byid', response);
        this.categoria = `${response['data'][0]['category_id']}`;
        this.getSubcategoriesByCategory(response['data'][0]['category_id'], response['data'][0]['subcategory_id']);
      });
  }

  cambioCategoria(e) {
    const id = e.value * 1;
    this.getSubcategoriesByCategory(id, 0);
  }

  getSubcategoriesByCategory(id, subcat) {
    this.services.subcategoriesByCategory({ category_id: id }).subscribe(
      response => this.listarSubcategorias(response['data'], subcat)
    );
  }

  listarSubcategorias(subcategorias, subcat) {
    this.subcategorias = subcategorias;
    if (this.contador === 0 || this.contador > 1) {
      this.subcategoria = `${subcat}`;
    }
    this.contador = this.contador + 1;
    console.log('subcat', this.subcategoria);
  }

  cambioSubcategoria(e) {
    const id = e.value * 1;
    this.request.detsubcat_id = id;
  }

}
