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

}
