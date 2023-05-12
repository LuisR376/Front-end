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
    updateActivoDatosPersonales(datosA: insertActivo): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosA, this.url + "activos/datosPersonales");
    }// Update datos personales
     updateUbicacionActivos(datosA: insertActivo): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosA, this.url + "activos/datosUbicacion");
    }// Update datos Ubicacion
     updatedatosActivos(datosA: insertActivo): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosA, this.url + "activos/activosDescripcion");
    }// Update datos Datos Generales del Activo
     updateLicyMantActivos(datosA: insertActivo): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosA, this.url + "activos/liceYmanteActivos");
    }// Update Licencias y mantenimiento de activo
    }
    
        
        
        
