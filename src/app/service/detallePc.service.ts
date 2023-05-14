import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaDto } from '../components/model/respuestaDto';
import { Observable } from 'rxjs';
import { UtilApiService } from './util-api.service';
import { environment } from 'src/environments/environment';
import { insertDetallepc } from '../components/model/insertDetallepc';
@Injectable()

export class detallePcService {
    public url: string;
    constructor(
        private http: HttpClient,
        private _apiService: UtilApiService
    ) {
        this.url = environment.url;
    }
    getDetallePc(token: string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "detallePc/detallePcget", token);
    }
    saveDetallePc(datosA: insertDetallepc): Observable<RespuestaDto> {
        return this._apiService.sendPostRequest(datosA, this.url + "detallePc/postSetDetallepc");
    }// Post saveDetallePc
}
