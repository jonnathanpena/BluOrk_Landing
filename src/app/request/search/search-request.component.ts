import { Component, OnInit } from '@angular/core';
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
  jobs: any = [];
  tagsEscogidos: any = [];
  rango: any = [];
  modificado: boolean;
  searchInput: string;
  usuarioLoggeado: any = {};

  constructor(
    private services: RequestProvider
  ) {}

  ngOnInit() {
    const usuarioLoggeado = localStorage.getItem('bluork_usuarioLoggeado');
    if (usuarioLoggeado) {
      this.usuarioLoggeado = JSON.parse(usuarioLoggeado);
      console.log(this.usuarioLoggeado);
    } else {
      console.log('No loggeado');
    }
    this.services.allCategories().subscribe((response: Response) => {
      this.categorias = response['data'];
    });
    this.subcategorias = [];
    this.services.allTags().subscribe((response: Response) => {
      this.tags = response['data'];
    });
    this.services.allRequests().subscribe((response: Response) => {
      console.log('all requests', response['data']);
      for (let i = 0; i < response['data'].length; i++) {
        const imagen = response['data'][i]['avatar_req'];
        response['data'][i]['avatar_req'] = this.services.avartarRequestDir() + '/' +
          response['data'][i]['id_req'] + '/' + imagen;
      }
      this.jobs = response['data'];
    });
    this.tagsEscogidos = [];
    this.rango = [0, 12];
    this.searchInput = '';
  }

  cambioCategoria(e) {
    const id = e.value * 1;
    this.services.subcategoriesByCategory({ category_id: id })
      .subscribe(response => {
        this.subcategorias = response['data'];
      });
  }

  cambioSubcategoria(e) {
    const id = e.value * 1;
    this.services.requestsByFilters(
      {
        title_req: this.searchInput,
        address_req: this.searchInput,
        lat_req: 0,
        long_req: 0,
        city_id: 0,
        zipcode_req: 0
      }
    ).subscribe(response => {
      for (let i = 0; i < response['data'].length; i++) {
        const imagen = response['data'][i]['avatar_req'];
        response['data'][i]['avatar_req'] = this.services.avartarRequestDir() + '/' +
          response['data'][i]['id_req'] + '/' + imagen;
      }
      this.jobs = response['data'];
    });
  }

  escogeTags(e) {
    console.log('escogió tag', e);
    this.tagsEscogidos = e.value;
  }

  onKey(e) {
    setTimeout(() => {
      this.modificado = true;
      this.searchInput = e.target.value;
      this.services.RequestsRandom({ random: e.target.value })
        .subscribe(response => {
          for (let i = 0; i < response['data'].length; i++) {
            const imagen = response['data'][i]['avatar_req'];
            response['data'][i]['avatar_req'] = this.services.avartarRequestDir() + '/' +
              response['data'][i]['id_req'] + '/' + imagen;
          }
          this.jobs = response['data'];
          if (this.modificado === true) {
            this.filtrarMas();
          }
        });
    }, 200);
  }

  cambioRango(e) {
    this.modificado = true;
    console.log('cambio rango', e);
    this.filtrarMas();
  }

  filtrarMas() {
    for (let i = 0; i < this.jobs.length; i++) {
      const valor = this.jobs[i].payAmount_req * 1;
      const menor = this.rango[0] * 1;
      const mayor = this.rango[1] * 1;
      if (valor >= menor && valor <= mayor) {} else {
        alert('fuera de rango');
      }
    }
  }

}
