import { Injectable } from '@angular/core';

@Injectable()
export class ULRProvider {

  public dominio: String = 'http://localhost/bluork/api/';

  /* USERS     */
  public getAllUsers() {
    return this.dominio + 'users/getAll.php';
  }

  public getUserByEmail() {
    return this.dominio + 'users/getByEmail.php';
  }

  public getUserById() {
    return this.dominio + 'users/getById.php';
  }

  public insertUser() {
    return this.dominio + 'users/insert.php';
  }

  public updateUser() {
    return this.dominio + 'users/update.php';
  }

  public updatePassword() {
    return this.dominio + 'users/cambiarClave.php';
  }
  /* END USERS */

  /* CATEGORIES */
  public getAllCategories() {
    return this.dominio + 'categories/getAll.php';
  }

  public getCategoryById() {
    return this.dominio + 'categories/getById.php';
  }

  public getCategoryByName() {
    return this.dominio + 'categories/getByName.php';
  }

  public getCategoryLikeName() {
    return this.dominio + 'categories/getLikeName.php';
  }

  public insertCategory() {
    return this.dominio + 'categories/insert.php';
  }
  /* END CATEGORIES */

  /* SUBCATEGORIES */
  public getAllSubcategories() {
    return this.dominio + 'subcategories/getAll.php';
  }

  public getSubcategoriesByCategories() {
    return this.dominio + 'subcategories/getByCategory.php';
  }

  public getSubcategoryById() {
    return this.dominio + 'subcategories/getById.php';
  }

  public insertSubcategory() {
    return this.dominio + 'subcategories/insert.php';
  }
  /* END SUBCATEGORIES */

  /* TAGS */
  public getAllTags() {
    return this.dominio + 'tags/getAll.php';
  }

  public getTagById() {
    return this.dominio + 'tags/getById.php';
  }

  public insertTag() {
    return this.dominio + 'tags/insert.php';
  }
  /* END TAGS */

  /* COUNTRIES */
  public getAllCountries() {
    return this.dominio + 'countries/getAll.php';
  }
  /* END COUNTRIES */

  /* STATES */
  public getAllStates() {
    return this.dominio + 'states/getAll.php';
  }

  public getStatesByCountry() {
    return this.dominio + 'states/getByCountry.php';
  }

  public getStateById() {
    return this.dominio + 'states/getById.php';
  }
  /* END STATES */

  /* CITIES */
  public getAllCities() {
    return this.dominio + 'cities/getAll.php';
  }

  public getCityById() {
    return this.dominio + 'cities/getById.php';
  }

  public getCityByState() {
    return this.dominio + 'cities/getByState.php';
  }
  /* END CITIES */

  /* PAY_RATE */
  public getAllPayRates() {
    return this.dominio + 'payRate/getAll.php';
  }

  public getPayRateById() {
    return this.dominio + 'payRate/getById.php';
  }
  /* END PAY_RATE */

  /* EMPLOYMENT_TYPES */
  public getAllEmploymentTypes() {
    return this.dominio + 'employmentTypes/getAll.php';
  }

  public getEmploymentTypeById() {
    return this.dominio + 'employmentTypes/getById.php';
  }
  /* END EMPLOYMENT_TYPES */

  /* UPLOAD */
  public uploadImage() {
    return this.dominio + 'upload/upload.php';
  }

  public pathTempImage() {
    return this.dominio + 'documentos/temp/';
  }

  public moveImageRequest() {
    return this.dominio + 'upload/moveImageRequest.php';
  }

  public moveImageProfile() {
    return this.dominio + 'upload/moveImageProfile.php';
  }

  public avartarRequestDir() {
    return this.dominio + 'documentos/imagenes/request/';
  }

  public avartarProfileDir() {
    return this.dominio + 'documentos/imagenes/profile/';
  }
  /* END UPLOAD */

  /* REQUEST */
  public getAllRequest() {
    return this.dominio + 'request/getAll.php';
  }

  public getRequestByFilters() {
    return this.dominio + 'request/getByFilters.php';
  }

  public getRequestById() {
    return this.dominio + 'request/getById.php';
  }

  public getRequestByUser() {
    return this.dominio + 'request/getByUser.php';
  }

  public getRequestsRandom() {
    return this.dominio + 'request/getRandom.php';
  }

  public insertRequest() {
    return this.dominio + 'request/insert.php';
  }

  public updateRequest() {
    return this.dominio + 'request/update.php';
  }
  /* END REQUEST */

  /* DETREQUEST */
  public getRequestsByTags() {
    return this.dominio + 'detRequestTags/getRequestByTags.php';
  }

  public insertDetRequestTags() {
    return this.dominio + 'detRequestTags/insert.php';
  }

  public deleteDetRequestTags() {
    return this.dominio + 'detRequestTags/delete.php';
  }
  /* END DETREQUEST */

  /* DETSUBCAT */
  public getDetSubcatById() {
    return this.dominio + 'detsubcat/getById.php';
  }
  /* DETSUBCAT */

  /* PROFILE */
  public getAllProfiles() {
    return this.dominio + 'profiles/getAll.php';
  }

  public getProfileByUser() {
    return this.dominio + 'profiles/getByUser.php';
  }

  public insertProfile() {
    return this.dominio + 'profiles/insert.php';
  }

  public updateProfile() {
    return this.dominio + 'profiles/update.php';
  }

  public deleteProfile() {
    return this.dominio + 'profiles/delete.php';
  }
  /* PROFILE */

  /* EMPLOYEES */
  public insertEmployee() {
    return this.dominio + 'employees/insert.php';
  }
  /* END EMPLOYEES */

  /* SKILL EMPLOYEE */
  public getSkillsByEmployee() {
    return this.dominio + 'skills_employee/getByEmployee.php';
  }

  public insertSkillsEmployee() {
    return this.dominio + 'skills_employee/insert.php';
  }

  public deleteSkillEmployee() {
    return this.dominio + 'skills_employee/delete.php';
  }
  /* END SKILL EMPLOYEE */
}
