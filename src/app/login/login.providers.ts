import { ULRProvider } from '../providers/url.providers';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class  LoginProvider {
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(
    private urlProvider: ULRProvider,
    private http: HttpClient
  ) {}

  public userByEmail(objeto: any) {
    return this.http.post(this.urlProvider.getUserByEmail(), JSON.stringify(objeto), this.httpOptions);
  }

  public updatePassword(objeto: any) {
    return this.http.post(this.urlProvider.updatePassword(), JSON.stringify(objeto), this.httpOptions);
  }

}
