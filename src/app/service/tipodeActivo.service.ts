import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertTipodeActivo } from '../components/model/insertTipodeActivo';

@Injectable()
export class tipodeActivoService {
    public url: string;
    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    gettipoActivo(token:string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "tipoActivo/get",token);
    }
    savetipoActivo(tipoDato : insertTipodeActivo ): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(tipoDato, this.url + "tipoActivo/post");
    }// Post a quien se le  asigna 
}