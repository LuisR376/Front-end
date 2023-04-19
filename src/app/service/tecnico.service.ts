import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaDto } from '../components/model/respuestaDto';
import { Observable } from 'rxjs';
import { UtilApiService } from './util-api.service';
import { environment } from 'src/environments/environment';
@Injectable()

export class tecnicoService {
    public url: string;
    constructor(
        private http: HttpClient,
        private _apiService: UtilApiService
    ) {
        this.url = environment.url;
    }

    fntecnico(token: string): Observable<RespuestaDto> {
        return this._apiService.sendGetRequest(this.url + "usuario/getTecnicos", token);
    }
    
}
