import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertArea } from '../components/model/insertArea'
@Injectable()
export class AreaService {
    public url: string;


    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    saveArea(datosA : insertArea): Observable<RespuestaDto> {
        console.log("*******-> asave area",datosA)
        return this._apiService.sendPostRequest(datosA, this.url + "area/post");
    }// Post area
}