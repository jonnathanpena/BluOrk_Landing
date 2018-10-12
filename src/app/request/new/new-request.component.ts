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

  constructor(
    private services: RequestProvider
  ) {}

  ngOnInit() {
    this.markerUrl = 'https://js.devexpress.com/Demos/RealtorApp/images/map-marker.png';
    this.markers = [
      {
        location: [40.755833, -73.986389],
        tooltip: {
          isShown: false,
          text: 'Times Square'
        }
      }
    ];
    this.categorias = [
      {
        id: 1,
        name: 'Plumber'
      }, {
        id: 2,
        name: 'Electricity'
      }, {
        id: 3,
        name: 'Mechanic'
      }, {
        id: 4,
        name: 'Carpenter'
      }
    ];
    this.subcategorias = [
      {
        id: 1,
        name: 'Plumber1'
      }, {
        id: 2,
        name: 'Electricity1'
      }, {
        id: 3,
        name: 'Mechanic1'
      }, {
        id: 4,
        name: 'Carpenter1'
      }
    ];
    this.tags = [
      {
        id: 1,
        name: 'Tag1'
      }, {
        id: 2,
        name: 'Tag2'
      }, {
        id: 3,
        name: 'Tag3'
      }, {
        id: 4,
        name: 'Tag4'
      }
    ];
    this.request = {
      direccion: '',
    };
    this.address = [
      'New York',
      'Miami',
      'Long Island'
    ];
    this.paises = [
      {
        id: 1,
        name: 'United States'
      }
    ];
    this.estados = [
      {
        id: 1,
        name: 'FL'
      }
    ];
    this.ciudades = [
      {
        id: 1,
        name: 'Miami'
      }
    ];
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

}
