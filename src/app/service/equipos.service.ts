import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';


@Injectable()
export class EquiposService {
    public url: string;
    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    getEquipos(token:string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "equipos/getEquipos",token);
    }
 
}