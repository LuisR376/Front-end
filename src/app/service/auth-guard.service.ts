import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LocalService } from '../service/local.service';
@Injectable()

export class authGuardService {
  public url: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private localService: LocalService
  ) {
    this.url = environment.url;

  }


  async sendToken(usr: any) {
    if (usr) {
      let usuario = await this.localService.setJsonValue('LoggedInUser', usr);
      //localStorage.setItem("LoggedInUser", usr)
    }

  }
  async sendKey(key: string) {
    let llave = await this.localService.setJsonValue('token', key);
    //localStorage.setItem("token", key)
  }
  getUser() {

    return this.localService.getJsonValue('LoggedInUser');
    //return JSON.parse(localStorage.getItem('LoggedInUser'));
  }
  getToken() {
    return this.localService.getJsonValue('token');
    // return localStorage.getItem('token');
  }
  getPermisos() {
    return this.localService.getJsonValue('permisos');
    //return JSON.parse(localStorage.getItem('permisos'));
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  logout() {
    return this.localService.clearToken();
    //localStorage.removeItem("LoggedInUser")
    //  localStorage.clear();
    this.router.navigate(["/"]);
  }
  sendPerfilMenu(perfil : any){
    this.localService.setJsonValue('permisos', perfil);
  }


}




