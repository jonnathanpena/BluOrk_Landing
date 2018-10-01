import { ULRProvider } from '../providers/url.providers';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class  SignUpProvider {

  constructor(
    private http: Http,
    private urlProvider: ULRProvider) {}

  /*public allUsuarios() {
    return this.http.get(this.urlProvider.getAllUsers())
    .map((res: Response) => res.json());
  }

  public insertUsuarioDepartamento(objeto: any) {
    return this.http.post(this.urlProvider.insertUsuarioDepartamento(), JSON.stringify(objeto), {
      headers: new Headers({'Content-Type': 'application/json'})
    })
      .map((res: Response) => res);
  }*/

}
