import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertServicio } from '../components/model/insertSevicio';
import { tipodeservicio } from '../components/model/tipodeservicio.model'
@Injectable()
export class tipodeservicioService {
    public url: string;


    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    getServicio(token:string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "tipodeServicio/servicio",token);
    }
    getServicioaddi(token:string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "tipodeServicio/servicioadicional",token);
    }
    saveTipodeSevicio(datosservice : insertServicio): Observable<RespuestaDto> {
        console.log("*******-> save service",datosservice)
        return this._apiService.sendPostRequest(datosservice, this.url + "tipodeServicio/post");
    }// Post tipo de servicio 
    actualizarservicio(tipo: tipodeservicio){
        const tipoTemp = {
            ...tipo
        }
        return this._apiService.sendPostRequest(tipo, this.url + "tipodeServicio/actualizar");
    }
}