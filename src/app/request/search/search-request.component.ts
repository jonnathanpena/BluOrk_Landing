import { Component, OnInit} from '@angular/core';
import notify from 'devextreme/ui/notify';

import { RequestProvider } from '../request.providers';

@Component({
  templateUrl: './search-request.component.html',
  styleUrls: ['./search-request.component.scss']
})

export class SearchRequestComponent implements OnInit {
  guardando: boolean;
  categorias: any = [];
  subcategorias: any = [];
  tags: any = [];

  constructor(
    private services: RequestProvider
  ) {}

  ngOnInit() {
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
  }

}
