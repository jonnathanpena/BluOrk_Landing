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

  public allTags() {
    return this.http.get(this.urlProvider.getAllTags());
  }

  public allCategories() {
    return this.http.get(this.urlProvider.getAllCategories());
  }

  public allSubcategories() {
    return this.http.get(this.urlProvider.getAllSubcategories());
  }

  public uploadImagen() {
    return this.urlProvider.uploadImage();
  }

  public pathTempImage() {
    return this.urlProvider.pathTempImage();
  }

  public avartarProfileDir() {
    return this.urlProvider.avartarProfileDir();
  }

  public allProfiles() {
    return this.urlProvider.getAllProfiles();
  }

  public userByEmail(objeto: any) {
    return this.http.post(this.urlProvider.getUserByEmail(), JSON.stringify(objeto), this.httpOptions);
  }

  public userById(objeto: any) {
    return this.http.post(this.urlProvider.getUserById(), JSON.stringify(objeto), this.httpOptions);
  }

  public statesByCountry(objeto: any) {
    return this.http.post(this.urlProvider.getStatesByCountry(), JSON.stringify(objeto), this.httpOptions);
  }

  public cityByState(objeto: any) {
    return this.http.post(this.urlProvider.getCityByState(), JSON.stringify(objeto), this.httpOptions);
  }

  public profileByUser(objeto: any) {
    return this.http.post(this.urlProvider.getProfileByUser(), JSON.stringify(objeto), this.httpOptions);
  }

  public getSkillsByEmployee(objeto: any) {
    return this.http.post(this.urlProvider.getSkillsByEmployee(), JSON.stringify(objeto), this.httpOptions);
  }

  public insertUser(objeto: any) {
    return this.http.post(this.urlProvider.insertUser(), JSON.stringify(objeto), this.httpOptions);
  }

  public insertProfile(objeto: any) {
    return this.http.post(this.urlProvider.insertProfile(), JSON.stringify(objeto), this.httpOptions);
  }

  public insertEmployee(objeto: any) {
    return this.http.post(this.urlProvider.insertEmployee(), JSON.stringify(objeto), this.httpOptions);
  }

  public insertSkillsEmployee(objeto: any) {
    return this.http.post(this.urlProvider.insertSkillsEmployee(), JSON.stringify(objeto), this.httpOptions);
  }

  public moveImageProfile(objeto: any) {
    return this.http.post(this.urlProvider.moveImageProfile(), JSON.stringify(objeto), this.httpOptions);
  }

  public updateUser(objeto: any) {
    return this.http.post(this.urlProvider.updateUser(), JSON.stringify(objeto), this.httpOptions);
  }

  public updateProfile(objeto: any) {
    return this.http.post(this.urlProvider.updateProfile(), JSON.stringify(objeto), this.httpOptions);
  }

  public deleteProfile(objeto: any) {
    return this.http.post(this.urlProvider.deleteProfile(), JSON.stringify(objeto), this.httpOptions);
  }

}
