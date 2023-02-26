import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { Rol } from '../components/model/rol.model';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
@Injectable()
export class UsuarioService {
    public url: string;
    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    iniciarSesion(datosInicioSesion : Rol ): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosInicioSesion , this.url + 'rol/get');
    } // IniciarSesion
}