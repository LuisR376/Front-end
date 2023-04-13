import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertTicket } from '../components/model/insertTicket';

@Injectable()
export class FolioService {
    public url: string;


    constructor(
        private _http: HttpClient,
        private _apiService: UtilApiService
    ) {
        this.url = environment.url;
    }

// Creacion de folio unico
saveFolio(token: string): Observable < RespuestaDto > {
    return this._apiService.sendGetRequest(this.url + "folio/setFolio", token);

} 
}