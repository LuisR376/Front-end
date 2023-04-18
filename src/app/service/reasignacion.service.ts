import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertReasignacion } from '../components/model/insertReasignacion';

@Injectable()
export class reasignacionService {
    public url: string;
    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    getReasignacion(token:string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "reasignacion/Getreasignacion",token);
    }
    saveReasignacion(datoreasignacion : insertReasignacion ): Observable<RespuestaDto> {
        console.log("*******-> save reasignacion",datoreasignacion)
        return this._apiService.sendPostRequest(datoreasignacion, this.url + "reasignacion/post");
    }// Post a quien se le  asigna 
}