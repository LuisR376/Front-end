import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaDto } from '../components/model/respuestaDto';
import { UtilApiService } from './util-api.service';
import { Observable } from 'rxjs';
import { insertTicket } from '../components/model/insertTicket';
import { LocalService } from './local.service';
import { Ticket } from '../components/model/ticket.model';

@Injectable()
export class ticketService {
    public url: string;


    constructor(
        private _http: HttpClient,
        private _apiService: UtilApiService,
        private localService: LocalService
    ) {
        this.url = environment.url;
    }
    getTicket(token: string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "ticket/getticket", token);
    }
    getTickets(): Ticket {
        return this.localService.getJsonValue('currentTicket');
    }
    saveTicket(datosT : Ticket): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosT, this.url + "ticket/post");
    }// Post usuario

    catalogEstatusTicket(token: string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "ticket/obtenCatalogEstatusTicket", token);
    }
}