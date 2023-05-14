import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { Accesorio } from '../components/model/accesorio.model';

@Injectable()
export class accesorioService {
    public url: string;


    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
    saveAccesorio(datosA : Accesorio): Observable<RespuestaDto> {
        console.log("*******-> asave accesorio",datosA)
        return this._apiService.sendPostRequest(datosA, this.url + "accesorio/setAccesorio");
    }// Post accesorio
}