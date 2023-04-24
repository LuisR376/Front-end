import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertLicencia } from '../components/model/insertLicencia';

@Injectable()
export class licenciaService {
    public url: string;
    constructor(
        private _http: HttpClient,
        private _apiService: UtilApiService
    ) {
        this.url = environment.url;
    }
    getLicencia(token: string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "licencias/get", token);
    }
    saveLincencia(datosA: insertLicencia): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosA, this.url + "licencias/post");
    }// Post licencia
}