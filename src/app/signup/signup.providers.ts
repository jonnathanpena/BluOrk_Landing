import { ULRProvider } from '../providers/url.providers';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class  SignUpProvider {
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

  public allUsers() {
    return this.http.get(this.urlProvider.getAllUsers());
  }

  public userByEmail(objeto: any) {
    return this.http.post(this.urlProvider.getUserByEmail(), JSON.stringify(objeto), this.httpOptions);
  }

  public userById(objeto: any) {
    return this.http.post(this.urlProvider.getUserById(), JSON.stringify(objeto), this.httpOptions);
  }

  public insertUser(objeto: any) {
    return this.http.post(this.urlProvider.insertUser(), JSON.stringify(objeto), this.httpOptions);
  }

  public updateUser(objeto: any) {
    return this.http.post(this.urlProvider.updateUser(), JSON.stringify(objeto), this.httpOptions);
  }

}
