import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaDto } from '../components/model/respuestaDto';
import { Observable } from 'rxjs';
import { UtilApiService } from './util-api.service';
import { environment } from 'src/environments/environment';
import { insertServicio } from '../components/model/insertSevicio';
@Injectable()

export class servicioService {
    public url: string;
    constructor(
        private http: HttpClient,
        private _apiService: UtilApiService
    ) {
        this.url = environment.url;
    }

    fnservicios(token: string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "servicios/get", token);
    }
    saveServicio(datosA : insertServicio): Observable<RespuestaDto> {
        console.log("servicios",datosA)
        return this._apiService.sendPostRequest(datosA, this.url + "servicios/post");
    }// Post servicios

    updateServicioTerm(datosServicio : any): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosServicio, this.url + "servicios/updateServ");
    }// Post servicios
    
}