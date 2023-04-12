import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaDto } from '../components/model/respuestaDto';
import { Observable } from 'rxjs';
import { UtilApiService } from './util-api.service';
import { environment } from 'src/environments/environment';
import { insertTicket } from '../components/model/insertTicket';
@Injectable()

export class CustomerService {
    public url: string;
    constructor(
        private http: HttpClient, 
        private _apiService : UtilApiService
        ){
            this.url = environment.url;
        }

        fnusuario(token:string): Observable<RespuestaDto> {
            return this._apiService.sendGetRequest(this.url + "usuario/getUsuarios",token);
        }
        getTicket(token:string): Observable<RespuestaDto> {
            return this._apiService.sendGetRequest(this.url + "ticket/getticket",token);
        }
        getActivos(token:string): Observable<RespuestaDto> {
            return this._apiService.sendGetRequest(this.url + "activos/getActivos",token);
        }
        getArea(token:string): Observable<RespuestaDto> {
            return this._apiService.sendGetRequest(this.url + "area/getarea",token);
        }
        getLugar(token:string): Observable<RespuestaDto> {
            return this._apiService.sendGetRequest(this.url + "lugar/get",token);
        }
        getRol(token:string): Observable<RespuestaDto> {
            return this._apiService.sendGetRequest(this.url + "rol/get",token);
        }
        getDetallePc(token:string): Observable<RespuestaDto> {
            return this._apiService.sendGetRequest(this.url + "detallePc/detallePcget",token);
        }
        
        saveTicket(datosT : insertTicket): Observable<RespuestaDto> {
            return this._apiService.sendPostRequest(datosT, this.url + "ticket/post");
        }// Post usuario
    }
        
        
        
