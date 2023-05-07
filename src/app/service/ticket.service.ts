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
    getTicketsByid(token : string,idfolios : string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + `ticket/getticketByid/${idfolios}`, token);
    }
    saveTicket(datosT : Ticket): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosT, this.url + "ticket/post");
    }// Post usuario cliente
    actualizarTicket(nuevosDatos: any,idfolios : string): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(nuevosDatos, this.url + `ticket/actualizar/${idfolios}`);
    }// Post usuario administrador
    
    actualizarTicketsolved(datosT : Ticket): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosT, this.url + "ticket/solved");
    }// Cambio de estado a Solucionado

    actualizaEstatusTerminado(datosT : Ticket): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosT, this.url + "ticket/estatusTerminado");
    }// Cambio de estado a terminado

    
    actualizarTicketabierto(datosT : Ticket): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosT, this.url + "ticket/actualizarAbierto");
    }// Cambio de estado a abierto

    catalogEstatusTicket(token: string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "ticket/obtenCatalogEstatusTicket", token);
    }
}