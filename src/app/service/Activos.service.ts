import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaDto } from '../components/model/respuestaDto';
import { Observable } from 'rxjs';
import { UtilApiService } from './util-api.service';
import { environment } from 'src/environments/environment';
import { insertActivo } from '../components/model/insertActivo';
@Injectable()

export class ActivosService {
    public url: string;
    constructor(
        private http: HttpClient, 
        private _apiService : UtilApiService
        ){
            this.url = environment.url;
        }
        getActivos(token:string): Observable<RespuestaDto> {
            return this._apiService.sendGetRequest(this.url + "activos/getActivos",token);
        }
    
    getActivoNumInventario(token:string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "activos/numInventario",token);
    }
    saveActivo(datos : insertActivo): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datos, this.url + "activos/postInventario");
    }// Post activos
    }
    
        
        
        
