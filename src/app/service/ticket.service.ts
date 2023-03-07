import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment }  from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertTicket } from '../components/model/insertTicket';

@Injectable()
export class ticketService {
    public url: string;


    constructor(
        private _http: HttpClient,
        private _apiService : UtilApiService
        ) {
        this.url = environment.url;   
    }
        saveTicket(datosT : insertTicket): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosT, this.url + "ticket/post");
    }// Post usuario
}