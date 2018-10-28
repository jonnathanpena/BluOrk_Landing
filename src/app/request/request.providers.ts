import { ULRProvider } from '../providers/url.providers';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class  RequestProvider {
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

  public allCategories() {
    return this.http.get(this.urlProvider.getAllCategories());
  }

  public allSubcategories() {
    return this.http.get(this.urlProvider.getAllSubcategories());
  }

  public allTags() {
    return this.http.get(this.urlProvider.getAllTags());
  }

  public allCountries() {
    return this.http.get(this.urlProvider.getAllCountries());
  }

  public allStates() {
    return this.http.get(this.urlProvider.getAllStates());
  }

  public allPayRates() {
    return this.http.get(this.urlProvider.getAllPayRates());
  }

  public allCities() {
    return this.http.get(this.urlProvider.getAllCities());
  }

  public allEmploymetTypes() {
    return this.http.get(this.urlProvider.getAllEmploymentTypes());
  }

  public uploadImage() {
    return this.urlProvider.uploadImage();
  }

  public pathTempImage() {
    return this.urlProvider.pathTempImage();
  }

  public allRequests() {
    return this.http.get(this.urlProvider.getAllRequest());
  }

  public categoryByName(objeto: any) {
    return this.http.post(this.urlProvider.getCategoryByName(), JSON.stringify(objeto), this.httpOptions);
  }

  public categoryLikeName(objeto: any) {
    return this.http.post(this.urlProvider.getCategoryLikeName(), JSON.stringify(objeto), this.httpOptions);
  }

  public categoryById(objeto: any) {
    return this.http.post(this.urlProvider.getCategoryById(), JSON.stringify(objeto), this.httpOptions);
  }

  public subcategoriesByCategory(objeto: any) {
    return this.http.post(this.urlProvider.getSubcategoriesByCategories(), JSON.stringify(objeto), this.httpOptions);
  }

  public subcategoriesById(objeto: any) {
    return this.http.post(this.urlProvider.getSubcategoryById(), JSON.stringify(objeto), this.httpOptions);
  }

  public tagById(objeto: any) {
    return this.http.post(this.urlProvider.getTagById(), JSON.stringify(objeto), this.httpOptions);
  }

  public statesByCountry(objeto: any) {
    return this.http.post(this.urlProvider.getStatesByCountry(), JSON.stringify(objeto), this.httpOptions);
  }

  public stateById(objeto: any) {
    return this.http.post(this.urlProvider.getStateById(), JSON.stringify(objeto), this.httpOptions);
  }

  public payRateById(objeto: any) {
    return this.http.post(this.urlProvider.getPayRateById(), JSON.stringify(objeto), this.httpOptions);
  }

  public employmentTypeById(objeto: any) {
    return this.http.post(this.urlProvider.getEmploymentTypeById(), JSON.stringify(objeto), this.httpOptions);
  }

  public cityById(objeto: any) {
    return this.http.post(this.urlProvider.getCityById(), JSON.stringify(objeto), this.httpOptions);
  }

  public cityByState(objeto: any) {
    return this.http.post(this.urlProvider.getCityByState(), JSON.stringify(objeto), this.httpOptions);
  }

  public requestsByFilters(objeto: any) {
    return this.http.post(this.urlProvider.getRequestByFilters(), JSON.stringify(objeto), this.httpOptions);
  }

  public requestById(objeto: any) {
    return this.http.post(this.urlProvider.getRequestById(), JSON.stringify(objeto), this.httpOptions);
  }

  public requestsByUser(objeto: any) {
    return this.http.post(this.urlProvider.getRequestByUser(), JSON.stringify(objeto), this.httpOptions);
  }

  public RequestsRandom(objeto: any) {
    return this.http.post(this.urlProvider.getRequestsRandom(), JSON.stringify(objeto), this.httpOptions);
  }

  public requestsByTags(objeto: any) {
    return this.http.post(this.urlProvider.getRequestsByTags(), JSON.stringify(objeto), this.httpOptions);
  }

  public insertCategory(objeto: any) {
    return this.http.post(this.urlProvider.insertCategory(), JSON.stringify(objeto), this.httpOptions);
  }

  public insertSubcategory(objeto: any) {
    return this.http.post(this.urlProvider.insertSubcategory(), JSON.stringify(objeto), this.httpOptions);
  }

  public insertTag(objeto: any) {
    return this.http.post(this.urlProvider.insertTag(), JSON.stringify(objeto), this.httpOptions);
  }

  public insertRequest(objeto: any) {
    return this.http.post(this.urlProvider.insertRequest(), JSON.stringify(objeto), this.httpOptions);
  }

  public insertRequestTags(objeto: any) {
    return this.http.post(this.urlProvider.insertDetRequestTags(), JSON.stringify(objeto), this.httpOptions);
  }

  public moveImageRequest(objeto: any) {
    return this.http.post(this.urlProvider.moveImageRequest(), JSON.stringify(objeto), this.httpOptions);
  }

  public updateRequest(objeto: any) {
    return this.http.post(this.urlProvider.updateRequest(), JSON.stringify(objeto), this.httpOptions);
  }

  public deleteRequestTags(objeto: any) {
    return this.http.post(this.urlProvider.deleteDetRequestTags(), JSON.stringify(objeto), this.httpOptions);
  }

}
