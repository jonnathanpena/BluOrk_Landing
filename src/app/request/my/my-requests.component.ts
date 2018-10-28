import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

import { RequestProvider } from '../request.providers';

@Component({
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})

export class MyRequestsComponent implements OnInit {
  categorias: any = [];
  subcategorias: any = [];
  tags: any = [];
  jobs: any = [];
  tagsEscogidos: any = [];
  searchInput: string;
  subcategoria: number;

  constructor(
    private services: RequestProvider,
    private router: Router
  ) {}

  ngOnInit() {
    this.services.allCategories().subscribe((response: Response) => {
      this.categorias = response['data'];
    });
    this.subcategorias = [];
    this.services.allTags().subscribe((response: Response) => {
      this.tags = response['data'];
    });
    this.tagsEscogidos = [];
    this.searchInput = '';
    this.subcategoria = 0;
    this.getMyJobs(0);
  }

  getMyJobs(id: number) {
    this.services.requestsByUser({ createBy_req: 9 }).subscribe(response => {
      console.log('all requests', response['data']);
      for (let i = 0; i < response['data'].length; i++) {
        const imagen = response['data'][i]['avatar_req'];
        response['data'][i]['avatar_req'] = this.services.avartarRequestDir() + '/' +
          response['data'][i]['id_req'] + '/' + imagen;
      }
      this.jobs = response['data'];
      const jobsTem = [];
      if (id !== 0) {
        for (let i = 0; i < this.jobs.length; i++) {
          const subcat = this.jobs[i]['detsubcat_id'] * 1;
          if (id === subcat) {
            jobsTem.push(this.jobs[i]);
          }
        }
        this.jobs = jobsTem;
      }
    });
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
    this.subcategoria = id;
    this.getMyJobs(id);
  }

  escogeTags(e) {
    console.log('escogió tag', e);
    this.tagsEscogidos = e.value;
  }

  onKey(e) {
    setTimeout(() => {
      this.jobs.length = 0;
      this.searchInput = e.target.value;
      this.services.RequestsRandom({ random: e.target.value })
        .subscribe(response => {
          for (let i = 0; i < response['data'].length; i++) {
            const creador = response['data'][i]['createBy_req'] * 1;
            if (creador === 9) {
              const imagen = response['data'][i]['avatar_req'];
              response['data'][i]['avatar_req'] = this.services.avartarRequestDir() + '/' +
                response['data'][i]['id_req'] + '/' + imagen;
              this.jobs.push(response['data'][i]);
            }
          }
        });
    }, 200);
  }

  detallar(id) {
    this.router.navigate(['/request/edit', { request: btoa(id) }]);
  }

}
