import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { loginUsuario } from '../components/model/login.model';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import {Usuario} from '../components/model/usuario.model';
import { map, tap } from 'rxjs/operators';
import { insertUsuario } from '../components/model/insertUsuario';
@Injectable({
    providedIn: 'root'
  })
export class UsuarioService {

    public url: string;
    private _auth: Usuario | undefined;
    get auth(): Usuario {
        return { ...this._auth! }
    }

    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        
        ) {
        this.url = environment.url;   
    }
 
 
 
    iniciarSesion(datosInicioSesion : loginUsuario ): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosInicioSesion , this.url + 'iniciarSesion/iniciarSesion')
        .pipe(
            tap(auth => this._auth = auth.addenda)

        )
    } // IniciarSesion
    fnusuario(token:string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "usuario/getUsuarios",token);
       
    } //get Usuario

        saveUsuario(datosA : insertUsuario): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosA, this.url + "usuario/post");
    }// Post usuario
}