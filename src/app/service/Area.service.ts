import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { lugarAreas } from '../components/model/lugarArea.model';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class AreaService {
    public url: string;


    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    saveArea(datos : lugarAreas): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datos, this.url + "area/getarea");
    }// Post area
}