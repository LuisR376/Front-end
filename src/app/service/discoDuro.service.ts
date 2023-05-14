import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertDd } from '../components/model/insertDd';


@Injectable()
export class dicoDservice {
    public url: string;
    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    getDD(token:string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "discoduro/getDd",token);
    }
    saveDD(datosDd : insertDd ): Observable<RespuestaDto> {
        console.log("*******-> save discoduro",datosDd)
        return this._apiService.sendPostRequest(datosDd, this.url + "discoduro/post");
    }// Post datosDd
}