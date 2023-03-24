import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertLugar } from '../components/model/insertLugar'
import { Lugar } from '../components/model/lugar.model'

@Injectable()
export class LugarService {
    public url: string;
    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    saveLugar(datosA : insertLugar): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosA, this.url + "lugar/post");
    }// Post lugar
    actualizarlugar(lugar: Lugar){
        const lugarTemp = {
            ...lugar
        }
        return this._apiService.sendPostRequest(lugar, this.url + "lugar/actualizar");
    }
}