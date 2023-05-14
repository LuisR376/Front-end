import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertRam } from '../components/model/insertRam';


@Injectable()
export class ramService {
    public url: string;
    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    getRam(token:string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "ram/getRam",token);
    }
    saveRam(datosRam : insertRam ): Observable<RespuestaDto> {
        console.log("*******-> save ram",datosRam)
        return this._apiService.sendPostRequest(datosRam, this.url + "ram/post");
    }// Post datosRam
}