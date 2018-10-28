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

}
